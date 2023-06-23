import {Response, Request, Express} from 'express';
import {userUsecase, userRepository, IUser} from "@domain/user";

export class userHttpHandler {
    repo: userRepository;
    usecase: userUsecase;
    router: Express;

    constructor(router: Express, repo: userRepository, usecase: userUsecase) {
        this.router = router
        this.repo = repo
        this.usecase = usecase

        // setup user routes

        router.use("/api/v1", (req, res, next) => {
            console.log('Time:', Date.now())
            next()
        })
        router.post("/echo", this.echo)
        router.post("/api/v1/create", this.createUser)
        router.get("/", this.getAll)
    }

    private echo = (req: Request, res: Response) => {

        let user: IUser = {email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName};

        let resp: IUser = this.usecase.echo(user)

        res.json({
            "error": false,
            "data": resp,
        })
    }

    private createUser = async (req: Request, res: Response) => {
        let user: IUser = {email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName};
        try {
            let resp: IUser = await this.usecase.create(user);
            res.json({
                "error": false,
                "data": resp,
            })
        } catch (e) {
            res.status(400).json({
                "error": true,
                "msg": e,
            })
        }
    }

    private getAll = async (req: Request, res: Response) => {
        try {
            let users = await this.repo.getAll()
            res.json({
                "error": false,
                "data": users,
            })
        } catch (e) {
            res.status(400).json({
                "error": true,
                "msg": e,
            })
        }
    }
}