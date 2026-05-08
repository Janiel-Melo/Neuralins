

CREATE TABLE public.Bronze_tier_domicilios_privados (
  cod_ibge bigint,
  municipio text,
  ano bigint,
  populacao bigint,
  domicilio bigint,
  hab_dom text
);
CREATE TABLE public.Bronze_tier_leitos_saude (
  cod_ibge bigint,
  localidades text,
  periodos bigint,
  leitos_total double precision,
  leitos_hab text,
  leitos sus double precision,
  leitos_sus_hab text,
  leitos_nao_sus double precision,
  leitos_naosus_hab text
);
CREATE TABLE public.Bronze_tier_pib_municipal (
  Cod_mun bigint,
  municipios text,
  PIB text,
  Ano bigint
);
CREATE TABLE public.Bronze_tier_registros_acidentes (
  id_sinistro bigint,
  id_veiculo text,
  cod_ibge bigint,
  municipio text,
  regiao_administrativa text,
  tipo_via text,
  tipo_veiculo_vitima text,
  sexo text,
  idade text,
  gravidade_lesao text,
  tipo_de_vitima text,
  faixa_etaria_demografica text,
  faixa_etaria_legal text,
  profissao text,
  grau_de_instrucao text,
  nacionalidade text,
  data_sinistro text,
  ano_sinistro bigint,
  mes_sinistro bigint,
  dia_sinistro bigint,
  ano_mes_sinistro text,
  data_obito text,
  ano_obito text,
  mes_obito text,
  dia_obito text,
  ano_mes_obito text,
  local_obito text,
  local_via text,
  tempo_sinistro_obito text
);
CREATE TABLE public.bronze_tier_estimativa_idade (
  ano bigint,
  cod_ibge bigint,
  nome_mun text,
  sexo text,
  idade text,
  populacao bigint
);
CREATE TABLE public.bronze_tier_estimativa_populacional (
  ano bigint,
  cod_ibge bigint,
  nome_mun text,
  populacao bigint,
  homens bigint,
  mulheres bigint,
  razao_sexo text,
  id_media text,
  dens_demog text
);