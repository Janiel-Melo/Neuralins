CREATE OR REPLACE VIEW public.vw_piramide_etaria_2022 AS

SELECT
    cod_ibge,
    nome_mun,
    sexo,
    idade,

    -- Total de pessoas nesse grupo
    SUM(populacao)                                              AS total_populacao,

    -- Participação do grupo no total do município
    ROUND(
        SUM(populacao) * 100.0 /
        NULLIF(SUM(SUM(populacao)) OVER (PARTITION BY cod_ibge), 0),
    2)                                                          AS perc_municipio,

    -- Participação do grupo no total geral
    ROUND(
        SUM(populacao) * 100.0 /
        NULLIF(SUM(SUM(populacao)) OVER (), 0),
    2)                                                          AS perc_total_geral,

    -- Média de população por faixa etária dentro do município
    ROUND(
        AVG(SUM(populacao)) OVER (PARTITION BY cod_ibge),
    0)                                                          AS media_faixa_municipio,

    -- Total do município (todas as faixas + sexos)
    SUM(SUM(populacao)) OVER (PARTITION BY cod_ibge)            AS total_pop_municipio,

    -- Total por sexo no município
    SUM(SUM(populacao)) OVER (PARTITION BY cod_ibge, sexo)      AS total_pop_sexo_municipio,

    -- Ranking da faixa etária dentro do município
    RANK() OVER (
        PARTITION BY cod_ibge, sexo
        ORDER BY SUM(populacao) DESC
    )                                                           AS rank_faixa_municipio

FROM public.bronze_tier_estimativa_idade
WHERE ano = 2022

GROUP BY
    cod_ibge,
    nome_mun,
    sexo,
    idade;