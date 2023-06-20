import express, {Response, Request} from 'express';
import {userUsecase, userRepository, User} from "@domain/user";

export class userHttpHandler {
    repo: userRepository;
    usecase: userUsecase;
    router: express.Router;

    constructor(router: any, repo: userRepository, usecase: userUsecase) {
        this.router = router
        this.repo = repo
        this.usecase = usecase

        // setup user routes

        router.post("/echo", this.echo)
    }

    private echo = (req: Request, res: Response) => {

        let user: User = {email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName};

        let resp: User = this.usecase.echo(user)

        res.json({
            "error": false,
            "data": resp,
        })
    }
}