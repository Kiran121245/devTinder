- Inser data into database [ try to use try/catch block while working with database ]
    - create dbconnection
    - create schema and usermodel
    - insert data into db
        - while inserting the data you have to create instance of userobj using usermodel(userschema)
        - also you need to save the them using await [ await user.save();], so now the callback function will have async infront of it.