INSERT INTO raw_registro_arquivos (
    file_name,
    storage_url,
    source_system,
    ingestion_date,
    origin_date,
    status_integrity,
    has_nans,
    file_size_mb
)
VALUES

-- DICIONÁRIOS
('dic_estabelecimentos_saude.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/dic_estabelecimentos_saude.csv','DataSUS',NOW(),NOW(),'Sucesso',FALSE,0.001),
('dic_estima_pop_idade_sexo_esp.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/dic_estima_pop_idade_sexo_esp.csv','DataSUS',NOW(),NOW(),'Sucesso',FALSE,0.001),
('dic_estima_pop_indicadores_esp.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/dic_estima_pop_indicadores_esp.csv','DataSUS',NOW(),NOW(),'Sucesso',FALSE,0.001),
('dic_medicos_tipos.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/dic_medicos_tipos.csv','DataSUS',NOW(),NOW(),'Sucesso',FALSE,0.002),
('dic_prof_reg_saude.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/dic_prof_reg_saude.csv','DataSUS',NOW(),NOW(),'Sucesso',FALSE,0.001),
('dic_saude_leitos_ano_mun.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/dic_saude_leitos_ano_mun.csv','DataSUS',NOW(),NOW(),'Sucesso',FALSE,0.001),
('dic_saude_med_enf_mun.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/dic_saude_med_enf_mun.csv','DataSUS',NOW(),NOW(),'Sucesso',FALSE,0.001),
('dicionario_educacao_rendimento.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/dicionario_educacao_rendimento.csv','INEP',NOW(),NOW(),'Sucesso',FALSE,0.001),
('dicionario_matriculas_rede_ensino.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/dicionario_matriculas_rede_ensino.csv','INEP',NOW(),NOW(),'Sucesso',FALSE,0.001),
('dicvar_educacaoideb.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/dicvar_educacaoideb.csv','INEP',NOW(),NOW(),'Sucesso',FALSE,0.001),

-- EDUCAÇÃO
('educacao_rendimento.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/educacao_rendimento.csv','INEP',NOW(),NOW(),'Sucesso',TRUE,0.219),
('educacaoideb.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/educacaoideb.csv','INEP',NOW(),NOW(),'Sucesso',TRUE,0.310),
('matriculas_rede_ensino.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/matriculas_rede_ensino.csv','INEP',NOW(),NOW(),'Sucesso',TRUE,0.088),

-- SAÚDE
('estabelecimentos_saude.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/estabelecimentos_saude.csv','DataSUS',NOW(),NOW(),'Sucesso',TRUE,0.132),
('medicos_tipos.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/medicos_tipos.csv','DataSUS',NOW(),NOW(),'Sucesso',TRUE,0.122),
('prof_reg_saude.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/prof_reg_saude.csv','DataSUS',NOW(),NOW(),'Sucesso',TRUE,0.003),
('saude_leitos_mun_ano.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/saude_leitos_mun_ano.csv','DataSUS',NOW(),NOW(),'Sucesso',TRUE,0.412),

-- POPULAÇÃO
('estimativa_pop_idade_sexo_esp.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/estimativa_pop_idade_sexo_esp.csv','IBGE',NOW(),NOW(),'Sucesso',TRUE,26.18),
('estimativa_pop_indicadores_esp.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/estimativa_pop_indicadores_esp.csv','IBGE',NOW(),NOW(),'Sucesso',TRUE,0.902),

-- ECONOMIA
('pib-municipal.csv','https://baokzsyavwrchfulnoqo.supabase.co/storage/v1/object/public/Raw_Dados_Publicos/pib-municipal.csv','IBGE',NOW(),NOW(),'Sucesso',TRUE,0.586);