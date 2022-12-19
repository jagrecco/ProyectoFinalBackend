export default function(req, res, next){
    if (!req.session.user) {return res.status(404).render('error')}
    next()
}