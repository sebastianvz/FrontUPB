import axios from "axios";
export default class GlobalVariables {
        constructor() {
                this.developURL = "https://localhost:5001/api/";
                this.productionURL = "http://devsebastianvz.com/SisLab/api/";
                this.testURL = "https://localhost:44380/api/";
                // this.Url = this.productionURL;
                this.Url = localStorage.getItem("4rlStr1ng") || this.productionURL;
        }

        static FillVaribles() {
                axios.get('./Helper/variables.json')
                        .then(response => {
                                if (localStorage.getItem("4rlStr1ng") != response.data.Url) {
                                    localStorage.setItem("4rlStr1ng", response.data.Url);
                                }
                        })
                        .catch(function (error) {
                                console.log(error);
                        });
        }
}