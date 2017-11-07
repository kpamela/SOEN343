CREATE PROCEDURE `addProducts`(x VARCHAR(20), y int(3))
BEGIN 
	DECLARE nb INT(9); 
    SET nb = 1;
	 WHILE (nb <= y) DO 
			insert into Products values(null, x, true); 
			set nb = nb+1; 
	 END WHILE; 
END