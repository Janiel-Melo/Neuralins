CREATE OR REPLACE PROCEDURE tratar_pib()
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE bronze_tier_pib_municipal
    SET pib = REPLACE(REGEXP_REPLACE(pib, '[^0-9,]', '', 'g'), ',', '.');
END;
$$;