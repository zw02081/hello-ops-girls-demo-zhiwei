import express, {Request,Response} from 'express';
const app = express();

app.listen('3000',() => {
    console.log('welcome to the dev-ops world')
})

app.get('/', (req: Request, res: Response) => {
    res.set('Content-Type','text/plain');
    res.send("" +
        " ____  _______     _____  ____  ____     ____ ___ ____  _     \n\n" +
        "|  _ \\| ____\\ \\   / / _ \\|  _ \\/ ___|   / ___|_ _|  _ \\| |    \n\n" +
        "| | | |  _|  \\ \\ / / | | | |_) \\___ \\  | |  _ | || |_) | |    \n\n" +
        "| |_| | |___  \\ V /| |_| |  __/ ___) | | |_| || ||  _ <| |___ \n\n" +
        "|____/|_____|  \\_/  \\___/|_|   |____/   \\____|___|_| \\_\\_____|\n\n");
    res.send();
});
