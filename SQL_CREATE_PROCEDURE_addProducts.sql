-- This procedure will allow us to add a certain quantity "y" of products which will be refered to "x" modelNumber, and will generate their serialNumber -- 
CREATE PROCEDURE `addProducts`(x VARCHAR(10), y int(3))
BEGIN 
	DECLARE nb INT(9); 
    SET nb = 1;
	 WHILE (nb <= y) DO 
			insert into Products values(uuid(), x, true); 
			set nb = nb+1; 
	 END WHILE; 
END
