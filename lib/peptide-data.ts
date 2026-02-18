export type Category = 'weight_loss' | 'recovery' | 'longevity' | 'cognitive'

export interface Peptide {
  slug: string
  name: string
  category: Category
  tag: string
  description: string
  mechanism: string
  dosageRange: string
  deliveryMethod: string
  cycleLength: string
  priceMonthly: number
  fdaStatus: 'approved' | 'research' | 'flagged'
  fdaLabel: string
  benefits: string[]
  considerations: string[]
  num: number
}

export const CATEGORY_META: Record<Category, { label: string; accent: string; dim: string; border: string }> = {
  weight_loss: { label: 'Weight Loss',  accent: '#E87070', dim: 'rgba(232,112,112,0.08)', border: 'rgba(232,112,112,0.3)' },
  recovery:    { label: 'Recovery',     accent: '#2DD6A8', dim: 'rgba(45,214,168,0.08)',  border: 'rgba(45,214,168,0.3)'  },
  longevity:   { label: 'Longevity',    accent: '#D4975A', dim: 'rgba(212,151,90,0.08)',  border: 'rgba(212,151,90,0.3)'  },
  cognitive:   { label: 'Cognitive',    accent: '#9B8EE8', dim: 'rgba(155,142,232,0.08)', border: 'rgba(155,142,232,0.3)' },
}

export const PEPTIDES: Peptide[] = [
  // ── Weight Loss ──────────────────────────────────────────────────
  {
    num: 1,
    slug: 'tirzepatide',
    name: 'Tirzepatide',
    category: 'weight_loss',
    tag: 'GLP-1 / GIP',
    description:
      'A dual GIP/GLP-1 receptor agonist with the strongest clinical evidence for sustained fat loss. Mounjaro and Zepbound are the branded equivalents, compounded here for greater affordability.',
    mechanism:
      'Simultaneously activates both glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptors. This dual action suppresses appetite at the hypothalamic level, slows gastric emptying to prolong satiety, and improves insulin sensitivity in peripheral tissues.',
    dosageRange: '2.5 mg – 15 mg',
    deliveryMethod: 'Weekly subcutaneous injection',
    cycleLength: 'Ongoing (monthly subscription)',
    priceMonthly: 299,
    fdaStatus: 'approved',
    fdaLabel: 'FDA Approved (Mounjaro / Zepbound)',
    benefits: [
      'Average 20–22% body weight reduction in SURMOUNT trials',
      'Significant improvement in HbA1c and fasting glucose',
      'Reduction in visceral fat and waist circumference',
      'Cardiovascular risk reduction (SURPASS-CVOT data)',
      'Favorable lipid panel improvements',
    ],
    considerations: [
      'Contraindicated in personal or family history of medullary thyroid carcinoma',
      'Avoid in Multiple Endocrine Neoplasia syndrome type 2',
      'May cause nausea, vomiting, or diarrhea, especially at dose escalation',
      'Dose titration required — start at 2.5 mg and increase monthly',
      'Not recommended during pregnancy',
    ],
  },
  {
    num: 2,
    slug: 'semaglutide',
    name: 'Semaglutide',
    category: 'weight_loss',
    tag: 'GLP-1',
    description:
      'The gold-standard GLP-1 receptor agonist behind Ozempic and Wegovy. Proven in large-scale trials to produce clinically meaningful and sustained weight loss in adults with obesity.',
    mechanism:
      'Binds and activates GLP-1 receptors in the pancreas, hypothalamus, and gastrointestinal tract. Increases insulin secretion in a glucose-dependent manner, suppresses glucagon release, delays gastric emptying, and reduces appetite by acting on central satiety pathways.',
    dosageRange: '0.25 mg – 2.4 mg',
    deliveryMethod: 'Weekly subcutaneous injection',
    cycleLength: 'Ongoing (monthly subscription)',
    priceMonthly: 249,
    fdaStatus: 'approved',
    fdaLabel: 'FDA Approved (Wegovy / Ozempic)',
    benefits: [
      '~15% average weight loss in STEP clinical trials',
      'Reduced risk of major adverse cardiovascular events (SELECT trial)',
      'Appetite suppression without stimulant effects',
      'Improved glycemic control in type 2 diabetes',
      'Established long-term safety profile',
    ],
    considerations: [
      'Contraindicated in personal or family history of medullary thyroid carcinoma',
      'Gastrointestinal side effects most common in the first 4–8 weeks',
      'Gradual dose escalation protocol required',
      'Compounded semaglutide availability may vary by state regulation',
      'Not for use in type 1 diabetes',
    ],
  },

  // ── Recovery ─────────────────────────────────────────────────────
  {
    num: 3,
    slug: 'bpc-157',
    name: 'BPC-157',
    category: 'recovery',
    tag: 'Body Protection Compound',
    description:
      'Body Protection Compound-157 is a pentadecapeptide derived from a protein found in human gastric juice. Widely used for accelerated healing of tendons, ligaments, muscle tissue, and the GI tract.',
    mechanism:
      'Promotes angiogenesis via upregulation of VEGF and growth hormone receptor expression. Stimulates fibroblast migration and collagen synthesis at injury sites. Modulates the nitric oxide (NO) system to improve vascular response. Also demonstrates gastroprotective effects via inhibition of gastric lesion formation.',
    dosageRange: '250 mcg – 500 mcg',
    deliveryMethod: 'Daily subcutaneous injection or oral capsule',
    cycleLength: '4–12 week cycle',
    priceMonthly: 149,
    fdaStatus: 'flagged',
    fdaLabel: 'Research Compound (FDA Category 2)',
    benefits: [
      'Accelerated tendon-to-bone healing in multiple animal models',
      'GI tract repair — effective for leaky gut and IBD symptoms',
      'Anti-inflammatory without immunosuppressive effects',
      'Counteracts NSAID-induced gut damage',
      'Neuroprotective effects on dopaminergic and serotonergic pathways',
    ],
    considerations: [
      'Classified as FDA Category 2 — compounding restrictions may apply',
      'Limited human clinical trial data; most evidence is preclinical',
      'Theoretical concern about promoting angiogenesis in active tumors',
      'Contraindicated in patients with active malignancy',
      'Oral route has lower bioavailability than injection',
    ],
  },
  {
    num: 4,
    slug: 'tb-500',
    name: 'TB-500',
    category: 'recovery',
    tag: 'Thymosin Beta-4',
    description:
      'Thymosin Beta-4 is a naturally occurring 43-amino acid peptide found in virtually all human cells. TB-500 is its synthetic analog, used for systemic healing, inflammation reduction, and tissue regeneration.',
    mechanism:
      'Upregulates actin polymerization — the cellular process that enables cell migration, tissue remodeling, and wound closure. Promotes angiogenesis, reduces fibrosis in damaged tissue, and modulates inflammatory cytokine signaling to resolve chronic inflammation without systemic immunosuppression.',
    dosageRange: '5 mg – 10 mg',
    deliveryMethod: 'Weekly subcutaneous injection',
    cycleLength: '4–6 week loading, then bi-weekly maintenance',
    priceMonthly: 179,
    fdaStatus: 'research',
    fdaLabel: 'Research Compound',
    benefits: [
      'Systemic healing — effective for injuries beyond the injection site',
      'Significant reduction in recovery time from training',
      'Reduces scar tissue formation in chronic injuries',
      'Promotes cardiac muscle repair post-injury',
      'Anti-inflammatory effects with no cortisol elevation',
    ],
    considerations: [
      'No human clinical trials yet — all evidence is preclinical or anecdotal',
      'Should not be used in patients with active cancer or tumors',
      'May cause mild flu-like symptoms initially (immune modulation)',
      'Typically cycled to avoid potential receptor desensitization',
      'Store refrigerated; cold chain shipping required',
    ],
  },
  {
    num: 5,
    slug: 'bpc-157-tb-500',
    name: 'BPC-157 + TB-500',
    category: 'recovery',
    tag: 'Recovery Stack',
    description:
      'The most popular recovery peptide blend, combining BPC-157\'s targeted local repair with TB-500\'s systemic healing properties. Synergistic action across multiple regenerative pathways.',
    mechanism:
      'BPC-157 drives local angiogenesis and collagen synthesis at the site of injury through VEGF upregulation. TB-500 simultaneously promotes systemic actin-mediated cell migration and inflammation resolution. Together, they address both local tissue repair and whole-body recovery simultaneously.',
    dosageRange: '500 mcg BPC-157 + 5 mg TB-500',
    deliveryMethod: 'Weekly subcutaneous injection (combined vial)',
    cycleLength: '4–8 week protocol',
    priceMonthly: 249,
    fdaStatus: 'flagged',
    fdaLabel: 'Research Compound (FDA Category 2)',
    benefits: [
      'Faster recovery from acute sports injuries',
      'Addresses both local and systemic components of healing',
      'Single injection protocol reduces administration burden',
      'Effective for chronic tendinopathy unresponsive to other treatment',
      'Post-surgical recovery enhancement',
    ],
    considerations: [
      'BPC-157 component carries FDA Category 2 restrictions',
      'Not recommended in patients with any active malignancy',
      'Contraindicated in pregnancy',
      'Full contraindication screening required before prescribing',
      'Efficacy evidence primarily from animal studies',
    ],
  },

  // ── Longevity ────────────────────────────────────────────────────
  {
    num: 6,
    slug: 'cjc-1295-ipamorelin',
    name: 'CJC-1295 / Ipamorelin',
    category: 'longevity',
    tag: 'GH Secretagogue Stack',
    description:
      'The most widely prescribed growth hormone peptide combination. CJC-1295 extends the duration of GH pulses while Ipamorelin amplifies release amplitude without the cortisol or prolactin spike associated with older secretagogues.',
    mechanism:
      'CJC-1295 is a GHRH analog that binds and activates the GHRH receptor on the pituitary, extending GH pulse duration via DAC (drug affinity complex) technology. Ipamorelin is a selective ghrelin mimetic (GHSR agonist) that amplifies GH release independently. Used together, they produce a synergistic, physiologically-patterned GH pulse.',
    dosageRange: '300 mcg CJC-1295 + 300 mcg Ipamorelin',
    deliveryMethod: 'Subcutaneous injection, 5 nights/week before sleep',
    cycleLength: 'Ongoing or 3-month cycles with 1 month off',
    priceMonthly: 169,
    fdaStatus: 'research',
    fdaLabel: 'Research Compound',
    benefits: [
      'Increased lean muscle mass and reduction in body fat',
      'Improved recovery time between training sessions',
      'Enhanced deep sleep quality (NREM phase extension)',
      'Elevated IGF-1 and associated anabolic signaling',
      'Improved skin elasticity and collagen density over time',
    ],
    considerations: [
      'Contraindicated in active malignancy — GH is mitogenic',
      'Thyroid condition screening required before use',
      'May cause water retention in the first 2–4 weeks',
      'Evening administration recommended to align with natural GH rhythms',
      'Not appropriate for patients with pituitary disorders',
    ],
  },
  {
    num: 7,
    slug: 'epitalon',
    name: 'Epitalon',
    category: 'longevity',
    tag: 'Telomerase Activator',
    description:
      'A synthetic tetrapeptide (Ala-Glu-Asp-Gly) originally developed by the St. Petersburg Institute of Bioregulation. Epitalon is one of the most researched longevity peptides, with decades of clinical data from Russian studies.',
    mechanism:
      'Stimulates the pineal gland to normalize melatonin secretion and activates telomerase — the enzyme responsible for maintaining telomere length. Longer telomeres are associated with reduced biological aging and improved cellular longevity. Also exhibits antioxidant properties and normalizes cortisol rhythms.',
    dosageRange: '5 mg – 10 mg',
    deliveryMethod: 'Daily injection for 10-day cycles, 2–4x per year',
    cycleLength: '10-day cycles, 2–4 times annually',
    priceMonthly: 199,
    fdaStatus: 'research',
    fdaLabel: 'Research Compound',
    benefits: [
      'Telomere elongation demonstrated in multiple human studies',
      'Normalized melatonin and cortisol circadian rhythms',
      'Extended lifespan observed in animal models',
      'Antioxidant enzyme upregulation (SOD, catalase)',
      'Potential reduction in cancer incidence in aging populations (Russian data)',
    ],
    considerations: [
      'Most clinical data comes from Russian research — limited Western peer review',
      'Cycled protocol (not continuous) is strongly recommended',
      'Theoretical concern: telomerase activation in pre-malignant cells',
      'Long-term safety in healthy individuals not fully established',
      'Store at -20°C; requires careful cold chain management',
    ],
  },
  {
    num: 8,
    slug: 'ss-31',
    name: 'SS-31',
    category: 'longevity',
    tag: 'Mitochondrial Peptide',
    description:
      'Elamipretide (SS-31) is a mitochondria-targeted tetrapeptide that restores energy production and reduces oxidative damage at the cellular level — targeting the root of most age-related decline.',
    mechanism:
      'Selectively accumulates in the inner mitochondrial membrane and binds cardiolipin, a phospholipid essential for electron transport chain function. By stabilizing cardiolipin, SS-31 improves ATP synthesis efficiency, reduces electron leakage (the primary source of reactive oxygen species), and prevents mitochondrial permeability transition pore opening.',
    dosageRange: '1 mg – 5 mg',
    deliveryMethod: 'Daily subcutaneous injection',
    cycleLength: '4–8 week cycles',
    priceMonthly: 229,
    fdaStatus: 'research',
    fdaLabel: 'Research Compound',
    benefits: [
      'Direct improvement in mitochondrial ATP production efficiency',
      'Reduction in ROS and mitochondrial oxidative stress',
      'Improved exercise capacity and reduced fatigue in trials',
      'Cardioprotective effects — reduces ischemia-reperfusion injury',
      'Neuroprotective potential via mitochondrial stabilization',
    ],
    considerations: [
      'Clinical trials primarily in heart failure and Barth syndrome populations',
      'Limited safety data in healthy adults — physician oversight essential',
      'Injection site reactions possible',
      'May interact with anticoagulants (theoretical — monitor closely)',
      'Very short half-life; once-daily dosing timing is important',
    ],
  },
  {
    num: 9,
    slug: 'ghk-cu',
    name: 'GHK-Cu',
    category: 'longevity',
    tag: 'Copper Peptide',
    description:
      'Glycyl-L-histidyl-L-lysine copper complex — a naturally occurring human plasma peptide that declines sharply with age. GHK-Cu has one of the most extensive bodies of research of any longevity peptide, spanning skin, hair, and systemic regeneration.',
    mechanism:
      'Binds copper ions and delivers them to tissue, activating over 4,000 human genes involved in wound healing, anti-inflammatory response, and antioxidant defense. Stimulates collagen, elastin, and glycosaminoglycan synthesis. Modulates TGF-β signaling to reduce fibrosis while promoting regenerative remodeling.',
    dosageRange: '1 mg – 2 mg',
    deliveryMethod: 'Daily subcutaneous injection or topical application',
    cycleLength: 'Ongoing or 3-month cycles',
    priceMonthly: 129,
    fdaStatus: 'research',
    fdaLabel: 'Research Compound',
    benefits: [
      'Significant increase in skin collagen density and elasticity',
      'Hair follicle stimulation and increased hair density',
      'Gene expression remodeling toward a younger phenotype',
      'Anti-fibrotic effects in multiple organ systems',
      'Strong antioxidant and anti-inflammatory properties',
    ],
    considerations: [
      'Topical route is well-tolerated; injection data more limited',
      'High copper intake from multiple sources should be monitored',
      'Mild skin irritation possible with topical use',
      'Effects develop gradually over months of consistent use',
      'Interaction with Wilson\'s disease or copper metabolism disorders',
    ],
  },
  {
    num: 10,
    slug: 'mk-677',
    name: 'MK-677',
    category: 'longevity',
    tag: 'Oral GH Secretagogue',
    description:
      'Ibutamoren (MK-677) is an orally active ghrelin mimetic and the only non-injectable growth hormone secretagogue available. Particularly popular for improving sleep architecture and elevating IGF-1 levels.',
    mechanism:
      'Selectively binds and activates the growth hormone secretagogue receptor (GHSR-1a), mimicking ghrelin to stimulate pulsatile GH release from the pituitary. Unlike GHRH analogs, MK-677 works through a distinct pathway — amplifying GH pulse amplitude, particularly during deep (NREM) sleep stages. Sustained elevation of IGF-1 follows within 2–4 weeks.',
    dosageRange: '12.5 mg – 25 mg',
    deliveryMethod: 'Daily oral capsule (evening recommended)',
    cycleLength: '3–6 month cycles with 4–8 week breaks',
    priceMonthly: 139,
    fdaStatus: 'research',
    fdaLabel: 'Research Compound',
    benefits: [
      'No injection required — oral bioavailability',
      'Significantly improved NREM sleep depth and duration',
      'Steady IGF-1 elevation without injection burden',
      'Increased lean body mass with consistent use',
      'Enhanced skin, nail, and hair quality over long-term use',
    ],
    considerations: [
      'May increase appetite (ghrelin-mediated) — monitor caloric intake',
      'Water retention and transient increases in fasting glucose possible',
      'Contraindicated in insulin-resistant individuals without physician oversight',
      'Not for use in active malignancy',
      'Should not be combined with other GH secretagogues without physician guidance',
    ],
  },

  // ── Cognitive ────────────────────────────────────────────────────
  {
    num: 11,
    slug: 'semax',
    name: 'Semax',
    category: 'cognitive',
    tag: 'BDNF Upregulator',
    description:
      'A synthetic heptapeptide analog of ACTH(4–10) developed by the Institute of Molecular Genetics in Moscow. Semax has over 20 years of clinical use in Russia for cognitive enhancement, neuroprotection, and ADHD-like symptoms.',
    mechanism:
      'Increases BDNF (brain-derived neurotrophic factor) and NGF synthesis in the prefrontal cortex and hippocampus — the same neurotrophin targeted by antidepressants and nootropics. Modulates dopaminergic and serotonergic neurotransmission, enhances NMDA receptor function, and exhibits potent anti-inflammatory effects in neural tissue.',
    dosageRange: '300 mcg – 900 mcg',
    deliveryMethod: 'Daily intranasal spray',
    cycleLength: '2–4 week cycles; can be used daily or as-needed',
    priceMonthly: 119,
    fdaStatus: 'research',
    fdaLabel: 'Research Compound',
    benefits: [
      'Rapid onset — cognitive effects within 20–30 minutes of dosing',
      'Improved working memory, attention, and executive function',
      'Neuroprotection — studied for stroke recovery in Russian clinical trials',
      'Anxiolytic at lower doses; stimulating at higher doses',
      'No addiction potential; non-stimulant mechanism',
    ],
    considerations: [
      'Nasal administration may cause mild nasal irritation initially',
      'Psychostimulant properties — avoid dosing in the evening',
      'Very limited Western clinical trial data',
      'Dose-dependent effects — calibrate carefully to avoid overstimulation',
      'Theoretical concern with active psychiatric conditions — physician review required',
    ],
  },
  {
    num: 12,
    slug: 'selank',
    name: 'Selank',
    category: 'cognitive',
    tag: 'Anxiolytic Nootropic',
    description:
      'A synthetic analog of tuftsin with anxiolytic and nootropic properties. Developed alongside Semax, Selank is particularly valued for reducing anxiety and stress while maintaining sharp cognitive function — without sedation or dependence.',
    mechanism:
      'Modulates the GABA-A receptor system (similar mechanism to benzodiazepines, but without dependence risk) and stimulates BDNF and NGF expression. Also normalizes the expression of serotonin transporters and IL-6 production, producing a calm-alertness state. Half-life is short, but neurotrophin effects persist beyond clearance.',
    dosageRange: '250 mcg – 750 mcg',
    deliveryMethod: 'Daily intranasal spray',
    cycleLength: '2–3 week cycles; daily or as-needed use',
    priceMonthly: 119,
    fdaStatus: 'research',
    fdaLabel: 'Research Compound',
    benefits: [
      'Clinically effective anxiolytic without sedation or withdrawal',
      'Improved focus and memory formation under stress',
      'Anti-inflammatory via IL-6 and enkephalin modulation',
      'Compatible with other nootropics (no MAO-I interactions)',
      'Studied in generalized anxiety disorder with promising outcomes',
    ],
    considerations: [
      'Primarily Russian clinical evidence — limited Western peer review',
      'Short shelf life once reconstituted — store at 4°C',
      'Not a substitute for treatment of clinical anxiety disorders',
      'Very mild sedation possible at doses above 750 mcg',
      'GABA modulation — avoid combining with benzodiazepines without physician guidance',
    ],
  },
  {
    num: 13,
    slug: 'dihexa',
    name: 'Dihexa',
    category: 'cognitive',
    tag: 'Synaptogenic',
    description:
      'Derived from angiotensin IV, Dihexa is one of the most potent pro-cognitive peptides identified — estimated to be 7 orders of magnitude more potent than BDNF at inducing synaptogenesis in hippocampal tissue.',
    mechanism:
      'Activates the HGF (hepatocyte growth factor) / c-Met signaling pathway in the brain, driving the formation of new dendritic spines and synaptic connections in the hippocampus and prefrontal cortex. Unlike BDNF, Dihexa crosses the blood-brain barrier efficiently when administered orally or nasally, and its effects persist long after clearance.',
    dosageRange: '10 mg – 30 mg',
    deliveryMethod: 'Weekly oral capsule',
    cycleLength: 'Monthly dosing (long-acting effects)',
    priceMonthly: 189,
    fdaStatus: 'research',
    fdaLabel: 'Research Compound',
    benefits: [
      'Synaptogenesis — new synaptic connections measurable after single dose',
      'Long-duration cognitive enhancement beyond plasma half-life',
      'Effective in Alzheimer\'s disease models at very low doses',
      'Oral bioavailability (unique among cogntive peptides)',
      'Potential application in neurodegeneration prevention',
    ],
    considerations: [
      'Extremely potent — precise dosing essential',
      'Limited human safety data; proceed with caution and physician oversight',
      'Not appropriate for patients with active neurological diagnoses without specialist review',
      'Possible pro-proliferative effects via HGF/c-Met pathway — avoid in malignancy',
      'Effects may persist for weeks after last dose',
    ],
  },
]

export function getPeptideBySlug(slug: string): Peptide | undefined {
  return PEPTIDES.find((p) => p.slug === slug)
}

export function getPeptidesByCategory(category: Category | 'all'): Peptide[] {
  if (category === 'all') return PEPTIDES
  return PEPTIDES.filter((p) => p.category === category)
}
