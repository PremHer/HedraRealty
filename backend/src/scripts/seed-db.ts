import { DataSource } from "typeorm";

import AppDataSource from "../data-source";
import { BlockEntity } from "../modules/blocks/entities/block.entity";
import { CompanyEntity } from "../modules/companies/entities/company.entity";
import { ContractTemplateEntity } from "../modules/contracts/entities/contract-template.entity";
import { CashflowEntryEntity, CashflowEntryType } from "../modules/finance/entities/cashflow-entry.entity";
import { FinancingPlanEntity, FinancingPlanType } from "../modules/finance/entities/financing-plan.entity";
import { LotEntity, LotStatus } from "../modules/lots/entities/lot.entity";
import { ProjectEntity, ProjectType } from "../modules/projects/entities/project.entity";

export async function seedDatabase(dataSource: DataSource): Promise<void> {
  const companiesRepo = dataSource.getRepository(CompanyEntity);
  const projectsRepo = dataSource.getRepository(ProjectEntity);
  const blocksRepo = dataSource.getRepository(BlockEntity);
  const lotsRepo = dataSource.getRepository(LotEntity);
  const plansRepo = dataSource.getRepository(FinancingPlanEntity);
  const cashflowRepo = dataSource.getRepository(CashflowEntryEntity);
  const templatesRepo = dataSource.getRepository(ContractTemplateEntity);

  let company = await companiesRepo.findOne({ where: { ruc: "20601234567" } });

  if (!company) {
    company = companiesRepo.create({
      name: "Hedra Realty SAC",
      ruc: "20601234567",
      legalAddress: "Av. Principal 123, Lima",
      generalManagerId: "user-gm-1"
    });
    company = await companiesRepo.save(company);
    console.log("Empresa creada", company.id);
  } else {
    console.log("Empresa existente", company.id);
  }

  let project = await projectsRepo.findOne({ where: { name: "Residencial Luna Azul" } });

  if (!project) {
    project = projectsRepo.create({
      companyId: company.id,
      name: "Residencial Luna Azul",
      type: ProjectType.LOTIZACION,
      totalAreaM2: 120000,
      services: ["Agua", "Alcantarillado", "Electricidad"],
      amenities: ["Parque central", "Club house"],
      documentation: ["Habilitacion urbana", "Planos aprobados"],
      deliveryWorks: ["Pistas y veredas", "Alumbrado publico"],
      salesProgress: 15,
      constructionProgress: 10,
      managerId: "user-gm-1",
      launchDate: new Date("2024-03-01T00:00:00Z")
    });
    project = await projectsRepo.save(project);
    console.log("Proyecto creado", project.id);
  } else {
    console.log("Proyecto existente", project.id);
  }

  let block = await blocksRepo.findOne({ where: { projectId: project.id, code: "A" } });

  if (!block) {
    block = blocksRepo.create({
      projectId: project.id,
      code: "A",
      description: "Manzana inicial con 20 lotes residenciales",
      lotCount: 20
    });
    block = await blocksRepo.save(block);
    console.log("Manzana creada", block.id);
  } else {
    console.log("Manzana existente", block.id);
  }

  let lot = await lotsRepo.findOne({ where: { code: "A-01", projectId: project.id } });

  if (!lot) {
    lot = lotsRepo.create({
      blockId: block.id,
      projectId: project.id,
      code: "A-01",
      areaM2: 120,
      pricePen: 52000,
      status: LotStatus.AVAILABLE
    });
    lot = await lotsRepo.save(lot);
    console.log("Lote creado", lot.id);
  } else {
    console.log("Lote existente", lot.id);
  }

  const financingPlanDefinitions = [
    {
      name: "Plan Frances 120 cuotas",
      planType: FinancingPlanType.FRANCES,
      interestRateAnnual: 12.5,
      gracePeriodMonths: 0,
      installments: 120,
      allowZeroDownPayment: false,
      penaltyRateMonthly: 3.5
    },
    {
      name: "Venta al contado",
      planType: FinancingPlanType.CONTADO,
      interestRateAnnual: 0,
      gracePeriodMonths: 0,
      installments: 1,
      allowZeroDownPayment: false,
      penaltyRateMonthly: 0
    }
  ];

  for (const planDef of financingPlanDefinitions) {
    let plan = await plansRepo.findOne({ where: { projectId: project.id, name: planDef.name } });

    if (!plan) {
      plan = plansRepo.create({ projectId: project.id, currency: "PEN", ...planDef });
      plan = await plansRepo.save(plan);
      console.log("Plan de financiamiento creado", plan.id, plan.name);
    } else {
      console.log("Plan de financiamiento existente", plan.id, plan.name);
    }
  }

  const cashflowDefinitions = [
    {
      date: new Date("2024-02-15T10:00:00Z"),
      type: CashflowEntryType.INGRESO,
      description: "Cobro inicial lote A-01",
      amount: 15000,
      reference: lot.id
    },
    {
      date: new Date("2024-02-20T10:00:00Z"),
      type: CashflowEntryType.EGRESO,
      description: "Pago contratista veredas",
      amount: -8200,
      reference: "obra-veredas-2024"
    }
  ];

  for (const entryDef of cashflowDefinitions) {
    let entry = await cashflowRepo.findOne({
      where: {
        projectId: project.id,
        description: entryDef.description,
        amount: entryDef.amount
      }
    });

    if (!entry) {
      entry = cashflowRepo.create({ projectId: project.id, currency: "PEN", ...entryDef });
      entry = await cashflowRepo.save(entry);
      console.log("Movimiento de caja creado", entry.id, entry.description);
    } else {
      console.log("Movimiento de caja existente", entry.id, entry.description);
    }
  }

  let template = await templatesRepo.findOne({ where: { name: "Promesa de compraventa" } });

  if (!template) {
    template = templatesRepo.create({
      projectId: project.id,
      name: "Promesa de compraventa",
      body: "Contrato entre {{companyName}} y {{buyerName}} para el lote {{lotCode}}.",
      placeholders: ["companyName", "buyerName", "lotCode", "pricePen", "planName"]
    });
    template = await templatesRepo.save(template);
    console.log("Plantilla de contrato creada", template.id);
  } else {
    console.log("Plantilla de contrato existente", template.id);
  }

  const totalCompanies = await companiesRepo.count();
  const totalProjects = await projectsRepo.count();
  const totalLotes = await lotsRepo.count();

  console.log("Resumen de seed", {
    totalCompanies,
    totalProjects,
    totalLotes
  });
}

async function runCli(): Promise<void> {
  try {
    const dataSource = await AppDataSource.initialize();
    await seedDatabase(dataSource);
    await dataSource.destroy();
    console.log("Seed completado");
    process.exit(0);
  } catch (error) {
    console.error("Error ejecutando seed", error);
    process.exit(1);
  }
}

if (require.main === module) {
  void runCli();
}
