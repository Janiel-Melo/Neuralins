CREATE OR REPLACE FUNCTION get_panorama_municipio(p_cod_ibge INT)
RETURNS TABLE (
    municipio TEXT,
    pop_total BIGINT,
    pop_idosos BIGINT,
    perc_idosos NUMERIC,
    pib_per_capita NUMERIC,
    leitos_por_1000 NUMERIC
)
AS $$
SELECT
    pb.municipio,
    pb.pop_total,
    i.pop_idosos,
    ROUND(i.pop_idosos * 100.0 / NULLIF(pb.pop_total,0),2),
    ROUND(p.pib_municipal / NULLIF(pb.pop_total,0),2),
    ROUND(l.leitos_total::numeric / NULLIF(pb.pop_total,0) * 1000,2)
FROM vw_panorama_municipal_2022 pb
LEFT JOIN (
    SELECT cod_ibge, SUM(populacao) AS pop_idosos
    FROM bronze_tier_estimativa_idade
    WHERE REGEXP_REPLACE(idade, '[^0-9]', 'g')::int >= 60
    GROUP BY cod_ibge
) i ON i.cod_ibge = pb.cod_ibge
LEFT JOIN (
    SELECT "Cod_mun", 
    MAX(CAST(REPLACE(REGEXP_REPLACE("PIB",'[^0-9,]','','g'),',','.') AS NUMERIC)) AS pib_municipal
    FROM bronze_tier_pib_municipal
    GROUP BY "Cod_mun"
) p ON p."Cod_mun" = pb.cod_ibge
LEFT JOIN bronze_tier_leitos_saude l ON l.cod_ibge = pb.cod_ibge
WHERE pb.cod_ibge = p_cod_ibge;
$$ LANGUAGE sql;