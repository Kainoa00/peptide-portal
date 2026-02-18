-- Seed peptide catalog
-- Note: stripe_price_id must be updated after creating products in Stripe dashboard

insert into public.peptides (name, slug, category, description, mechanism, dosage_range, price_monthly, fda_status, is_available) values

-- Weight Loss
('Tirzepatide', 'tirzepatide', 'weight_loss',
 'A dual GIP/GLP-1 receptor agonist shown to produce significant weight loss in clinical trials.',
 'Activates both GIP and GLP-1 receptors, reducing appetite and slowing gastric emptying.',
 '2.5mg–15mg weekly injection', 29900, 'FDA approved (Mounjaro/Zepbound)', true),

('Semaglutide', 'semaglutide', 'weight_loss',
 'A GLP-1 receptor agonist widely used for weight management and metabolic health.',
 'Mimics GLP-1 hormone, reduces hunger signals and promotes satiety.',
 '0.25mg–2.4mg weekly injection', 24900, 'FDA approved (Wegovy/Ozempic)', true),

-- Recovery
('BPC-157', 'bpc-157', 'recovery',
 'Body Protection Compound-157, a peptide derived from a gastric protein, used for tissue repair.',
 'Promotes angiogenesis and growth factor expression, accelerating healing of tendons, muscles, and gut.',
 '250mcg–500mcg daily injection or oral', 14900, 'Research compound (Category 2 FDA concern)', true),

('TB-500 (Thymosin Beta-4)', 'tb-500', 'recovery',
 'A naturally occurring peptide that promotes systemic healing and reduces inflammation.',
 'Regulates actin polymerization, enabling cell migration and tissue regeneration.',
 '5mg–10mg weekly injection', 17900, 'Research compound', true),

('BPC-157 + TB-500 Blend', 'bpc-157-tb-500', 'recovery',
 'Combined protocol for accelerated recovery, targeting both local and systemic healing pathways.',
 'Synergistic action of BPC-157 (local repair) and TB-500 (systemic healing).',
 '500mcg BPC-157 + 5mg TB-500 weekly', 24900, 'Research compound', true),

-- Longevity
('Epitalon', 'epitalon', 'longevity',
 'A tetrapeptide that activates telomerase, potentially slowing cellular aging.',
 'Stimulates the pineal gland and telomerase enzyme, promoting DNA repair.',
 '5mg–10mg daily for 10-day cycles', 19900, 'Research compound', true),

('SS-31 (Elamipretide)', 'ss-31', 'longevity',
 'A mitochondria-targeted peptide that improves energy production and reduces oxidative stress.',
 'Binds cardiolipin in the inner mitochondrial membrane, improving electron transport chain efficiency.',
 '1mg–5mg daily injection', 22900, 'Research compound', true),

('GHK-Cu', 'ghk-cu', 'longevity',
 'Copper peptide with regenerative properties for skin, hair, and systemic anti-aging effects.',
 'Activates wound healing genes, antioxidant enzymes, and promotes collagen synthesis.',
 '1mg–2mg daily injection or topical', 12900, 'Research compound', true),

-- Cognitive
('Semax', 'semax', 'cognitive',
 'A synthetic peptide derived from ACTH that enhances cognitive function and neuroprotection.',
 'Increases BDNF expression and modulates dopaminergic activity in the prefrontal cortex.',
 '300mcg–900mcg daily nasal spray', 11900, 'Research compound', true),

('Selank', 'selank', 'cognitive',
 'An anxiolytic peptide that reduces anxiety while improving focus and memory.',
 'Modulates GABA-A receptors and increases BDNF, producing calm alertness.',
 '250mcg–750mcg daily nasal spray', 11900, 'Research compound', true),

('Dihexa', 'dihexa', 'cognitive',
 'A highly potent cognitive enhancer derived from angiotensin IV, promoting synaptogenesis.',
 'Activates HGF/c-Met signaling, stimulating new synaptic connections in the hippocampus.',
 '10mg–30mg weekly oral', 18900, 'Research compound', true),

-- Growth Hormone Secretagogues
('CJC-1295 / Ipamorelin', 'cjc-1295-ipamorelin', 'longevity',
 'The most popular growth hormone peptide stack — combines a GHRH analog with a ghrelin mimetic.',
 'CJC-1295 extends GH pulses; Ipamorelin amplifies GH release without cortisol spike.',
 '300mcg CJC-1295 + 300mcg Ipamorelin, 5x/week injection', 16900, 'Research compound', true),

('MK-677 (Ibutamoren)', 'mk-677', 'longevity',
 'An oral growth hormone secretagogue that increases IGF-1 and promotes deep sleep.',
 'Mimics ghrelin, stimulating pituitary GH release and elevating IGF-1 levels.',
 '12.5mg–25mg daily oral', 13900, 'Research compound', true);
