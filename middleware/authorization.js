const dashBoardLoader = (req,res)=>{

    if(req.session.userInfo.type == "Admin")
    {
        res.render("/admin-dashboard");
    }
    
    else
    {
        res.render("/dashboard");
    }

}

module.exports = dashBoardLoader;