"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHttpHandler = void 0;
class userHttpHandler {
    constructor(router, repo, usecase) {
        this.echo = (req, res) => {
            let user = { email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName };
            let resp = this.usecase.echo(user);
            res.json({
                "error": false,
                "data": resp,
            });
        };
        this.router = router;
        this.repo = repo;
        this.usecase = usecase;
        // setup user routes
        router.post("/echo", this.echo);
    }
}
exports.userHttpHandler = userHttpHandler;
