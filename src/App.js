import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { constSelector, useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import { animeTitles } from "./store";
import HomePage from "./pages/home";
import AnimePage from "./pages/anime";

const App = () => {
    const setTitles = useRecoilState(animeTitles);

    const fetchAnimes = async () => {
        try {
            const res = await axios.get('https://animechan.vercel.app/api/available/anime');
            setTitles(res?.data);
        } catch(e) {
            console.log(e?.response?.data?.error);
        }
    };

    useEffect(() => {
        fetchAnimes();
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact psth='/anime/:name' component={AnimePage} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
