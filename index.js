function horse() {
    'use strict';

    let field = document.querySelector('.field');
    function main() {
        //Создаем поле
        
        for (let i = 0; i < 64; i++) {
            field.innerHTML = field.innerHTML + '<div class="cell"></div>';
        }
        let cell = field.querySelectorAll('.cell'),
            number, // номер тякущей ячейки
            log = false; //для завершения всего процесса
        //Создаем массивы возможных ходов
        let masX = [1, 2, 2, 1, -1, -2, -2, -1],
            masY = [2, 1, -1, -2, -2, -1, 1, 2],
            diff = [];

        //Ставим коня на первую ячейку
        cell.forEach(function (elem) {
            elem.addEventListener('click', function (e) {
                if (log == false) {
                    e.target.innerHTML = '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMi4wMDQgNTEyLjAwNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAwNCA1MTIuMDA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojNUM1NDZBOyIgZD0iTTMxNC4zNSw0MDguMDA0Yy00LjQxNCwwLTgtMy41OS04LThzMy41ODYtOCw4LThjNC40MjIsMCw4LTMuNTgyLDgtOHMtMy41NzgtOC04LThoLTEyOCAgICBjLTQuNDIyLDAtOCwzLjU4Mi04LDhzMy41NzgsOCw4LDhjNC40MTQsMCw4LDMuNTksOCw4cy0zLjU4Niw4LTgsOGMtNC40MjIsMC04LDMuNTgyLTgsOHMzLjU3OCw4LDgsOGgxMjhjNC40MjIsMCw4LTMuNTgyLDgtOCAgICBTMzE4Ljc3Miw0MDguMDA0LDMxNC4zNSw0MDguMDA0eiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRDIwMDsiIGQ9Ik00MTMuMzc0LDE5Ni4wMDRjMC0yLjM5NSwwLjkzLTQuNjQxLDIuNjI1LTYuMzM2YzcuNTM5LTcuNTM1LDcuNTM5LTE5Ljc5MywwLTI3LjMyOCAgICBsLTk1LjE0MS05NS4xNDRjNi4wNTUtOS45MzQsMTQuMDg2LTMxLjA4NiwwLjg1OS02Mi4zMTJjLTEuMTMzLTIuNjY0LTMuNjA5LTQuNTEyLTYuNDkyLTQuODMyICAgIGMtMi44NTItMC4zMjgtNS43MDMsMC45NDktNy4zODMsMy4zMDVjLTExLjUzOSwxNi4xNDgtMzQuNjk1LDMwLjg3MS02MS41MDgsNDcuOTE4Yy02Mi4zNjcsMzkuNjQ4LTEzOS45ODQsODguOTkyLTEzOS45ODQsMTk2LjczICAgIGMwLDkwLjY4Nyw0OC4zNTksMTMwLjA3LDYzLjE4NywxMzkuOTg0YzMuOTM3LDIuNjI1LDguNTM5LDQuMDE2LDEzLjMxMiw0LjAxNmgxMzguNjMzYzguMzIsMCwxNS45My00LjIxNSwyMC4zNTItMTEuMjgxICAgIGwxNS42OC0yNS4wOWMxMy40NzctMjEuNTU5LDEwLjcxOS00OS41NDctNi43MDMtNjguMDY2bC04NC40NTMtODkuNzIzYzguNjcyLDEuMjM4LDE5LjM1OSwyLjE2LDMxLjk5MiwyLjE2ICAgIGMzMC4yNzMsMCw0NC40MywxNS42MTcsNTYuOTE0LDI5LjM5OGM0LjIxOSw0LjY1Miw4LjIwMyw5LjA1MSwxMi41MzEsMTIuNDQ5YzYuMzgzLDUuMDA4LDE1LjUzMSw0LjQ4LDIxLjI1LTEuMjI3bDI2Ljk1My0yNi45NzMgICAgYzMuMTI1LTMuMTI1LDMuMTI1LTguMTkxLDAtMTEuMzE2QzQxNC4zMDQsMjAwLjY0NSw0MTMuMzc0LDE5OC4zOTgsNDEzLjM3NCwxOTYuMDA0eiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGOTYwMDsiIGQ9Ik0xODYuMzUxLDIxNi4wMDRjMC0xMjQsMTA5LjI3Ny0xMjMuMzM0LDEyNy45ODQtMjE1LjkzM2MtMi41NDEsMC4wMDMtNC45ODksMS4xNzctNi40OTIsMy4yODUgICAgYy0xMS41MzksMTYuMTQ4LTM0LjY5NSwzMC44NzEtNjEuNTA4LDQ3LjkxOGMtNjIuMzY3LDM5LjY0OC0xMzkuOTg0LDg4Ljk5Mi0xMzkuOTg0LDE5Ni43MyAgICBjMCw5MC42ODcsNDguMzU5LDEzMC4wNyw2My4xODcsMTM5Ljk4NGMzLjkzNywyLjYyNSw4LjUzOSw0LjAxNiwxMy4zMTIsNC4wMTZoOTEuNSAgICBDMjc0LjM1LDI5Ni42NzEsMTg2LjM1MSwyOTguMzkzLDE4Ni4zNTEsMjE2LjAwNHoiLz4KCTwvZz4KCTxnPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNCOUJCQzE7IiBkPSJNNDAxLjcxOCw0NDUuMDYybC00Mi4yNDItMzUuMjAzYy0xLjQzOC0xLjE5OS0zLjI1LTEuODU1LTUuMTI1LTEuODU1aC0yMDggICAgYy0xLjg3NSwwLTMuNjg4LDAuNjU2LTUuMTI1LDEuODU1bC00Mi4yMzQsMzUuMTk5Yy01LjQ5Miw0LjU3NC04LjY0MSwxMS4yOTctOC42NDEsMTguNDQxdjQwLjUwNGMwLDQuNDE4LDMuNTc4LDgsOCw4aDMwNCAgICBjNC40MjIsMCw4LTMuNTgyLDgtOHYtNDAuNTA4QzQxMC4zNSw0NTYuMzUxLDQwNy4yMDIsNDQ5LjYzMyw0MDEuNzE4LDQ0NS4wNjJ6Ii8+Cgk8L2c+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGOTYwMDsiIGQ9Ik0yNjYuMzUsMTI4LjAwNGMtNC40MjIsMC04LTMuNTgyLTgtOGMwLTQuNDE4LDMuNTc4LTgsOC04YzMuOTc3LDAsNy45ODQtMi4xOTksMTIuNjMzLTQuNzQ2ICAgICBjOS4xMzMtNS4wMTIsMjEuNjQ4LTExLjg1OSwzOS4xOTUtMi4yNzdjMy44ODMsMi4xMTcsNS4zMTIsNi45NzcsMy4xOTUsMTAuODU1Yy0yLjExNywzLjg3NS03LDUuMzA5LTEwLjg1MiwzLjE5MSAgICAgYy05Ljg5OC01LjM5NS0xNS40NDUtMi4zNDQtMjMuODUyLDIuMjY2QzI4MC45MjksMTI0LjQzOCwyNzQuNDIxLDEyOC4wMDQsMjY2LjM1LDEyOC4wMDR6Ii8+CgkJPC9nPgoJPC9nPgoJPGc+CgkJPGc+CgkJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjk2MDA7IiBkPSJNMjk4LjM1LDEyOC4wMDRjLTQuNDIyLDAtOC0zLjU4Mi04LTh2LThjMC00LjQxOCwzLjU3OC04LDgtOHM4LDMuNTgyLDgsOHY4ICAgICBDMzA2LjM1LDEyNC40MjIsMzAyLjc3MiwxMjguMDA0LDI5OC4zNSwxMjguMDA0eiIvPgoJCTwvZz4KCTwvZz4KCTxnPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiM4Qjg5OTY7IiBkPSJNMjUwLjM1MSw0MDguMDA0aC0xMDRjLTEuODc1LDAtMy42ODgsMC42NTYtNS4xMjUsMS44NTVsLTQyLjIzNCwzNS4xOTkgICAgYy01LjQ5Miw0LjU3NC04LjY0MSwxMS4yOTctOC42NDEsMTguNDQxdjQwLjUwNGMwLDQuNDE4LDMuNTc4LDgsOCw4aDE1MlY0MDguMDA0eiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6IzhCODk5NjsiIGQ9Ik05MC4zNTEsNDYzLjV2NDAuNTA0YzAsNC40MTgsMy41NzgsOCw4LDhoMzA0YzQuNDIyLDAsOC0zLjU4Miw4LTh2LTQwLjUwOCAgICBjMC0yLjU5OC0wLjU0OS01LjA5LTEuMzQyLTcuNDkySDkxLjY5NEM5MC44OTksNDU4LjQwOCw5MC4zNTEsNDYwLjkwMSw5MC4zNTEsNDYzLjV6Ii8+Cgk8L2c+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojNUM1NDZBOyIgZD0iTTI1MC4zNTEsNDU2LjAwNEg5MS42OTRjLTAuNzk0LDIuNDA0LTEuMzQzLDQuODk3LTEuMzQzLDcuNDk2djQwLjUwNGMwLDQuNDE4LDMuNTc4LDgsOCw4aDE1MiAgICBWNDU2LjAwNHoiLz4KCTwvZz4KCTxnPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjk2MDA7IiBkPSJNMjY2LjM1OCwxOTcuODQ0YzEuNTQ2LDAuMjIxLDMuMjMzLDAuNDE2LDQuOTA3LDAuNjEzYy0yNS4yNjMtNC45NjctMzguOTAzLTE4Ljc3Ny00Ni4wNjMtMzAuMjY2ICAgIGMtMTAuMjAzLTE2LjM2Ny0xMS40NTMtMzUuMTM3LTcuNDIyLTQ1LjIxNWMxLjY0MS00LjEwNS0wLjM1OS04Ljc1OC00LjQ2MS0xMC40MDJjLTQuMDctMS42MzMtOC43NTgsMC4zNTUtMTAuMzk4LDQuNDU3ICAgIGMtNi42NDgsMTYuNjM3LTMuMTU2LDQwLjU5NCw4LjcwMyw1OS42MjFjMTQuMzUyLDIzLjAyMywzOS4yNSwzNi45ODgsNzAuMTI1LDM5LjMyOGMwLjIwMywwLjAxNiwwLjQwNiwwLjAyMywwLjYwOSwwLjAyMyAgICBjMC4zMjUsMCwwLjYxLTAuMTM5LDAuOTI2LTAuMTc4TDI2Ni4zNTgsMTk3Ljg0NHoiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />';
                    e.target.classList.add('gray');
                    cell.forEach(function (elem, i) {
                        if (elem.classList.contains('gray')) {
                            number = i + 1;
                            log = true;
                            game();
                        }
                    });
                }
            });
        });

        //определяем количество ходов с кажой клетки
        function diffLocated(ci, cj) {
            let diffC = 0;
            for (let m = 0; m < 8; m++) {
                if (!(ci + masX[m] > 8 || ci + masX[m] < 1 || cj + masY[m] > 8 || cj + masY[m] < 1 || cell[(ci + masX[m] - 1) * 8 + cj + masY[m] - 1].classList.contains('gray'))) {
                    diffC += 1;
                }
            }
            return diffC;
        }

        function game() {
            //определяем положение в двумерном массиве 8 на 8
            let prI, prJ;
            if (number % 8 == 0) {
                prI = Math.floor(number / 8);
                prJ = 8;
            } else {
                prI = Math.floor(number / 8) + 1;
                prJ = number % 8;
            }
            number = (prI - 1) * 8 + prJ - 1;
            let count = 0;
            let timer = setInterval(() => {
                let min = 9,
                    minK = 0;
                for (let m = 0; m < 8; m++) {
                    let nextStep = number + masX[m] * 8 + masY[m];
                    if (nextStep < 0 || nextStep > 63 || prI + masX[m] > 8 || prI + masX[m] < 1 || prJ + masY[m] > 8 || prJ + masY[m] < 1 || cell[nextStep].classList.contains('gray')) {
                        diff[m] = -1;
                    } else {
                        diff[m] = diffLocated(prI + masX[m], prJ + masY[m]);
                        if (min >= diff[m] && (diff[m] > -1)) {
                            if (min > diff[m]) {
                                minK = 1;
                            } else {
                                minK++;
                            }
                            min = diff[m];
                        }
                    }

                }
                //переводчм коня на след клетку
                let minThere = 0;
                for (let i = 0; i < 8; i++) {
                    if (min == diff[i]) {
                        minThere++;
                        if (minThere == minK) {
                            cell[number].innerHTML = count + 1;
                            prI = prI + masX[i];
                            prJ = prJ + masY[i];
                            number = (prI - 1) * 8 + prJ - 1;
                            cell[number].classList.add('gray');
                            cell[number].innerHTML = '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMi4wMDQgNTEyLjAwNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAwNCA1MTIuMDA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojNUM1NDZBOyIgZD0iTTMxNC4zNSw0MDguMDA0Yy00LjQxNCwwLTgtMy41OS04LThzMy41ODYtOCw4LThjNC40MjIsMCw4LTMuNTgyLDgtOHMtMy41NzgtOC04LThoLTEyOCAgICBjLTQuNDIyLDAtOCwzLjU4Mi04LDhzMy41NzgsOCw4LDhjNC40MTQsMCw4LDMuNTksOCw4cy0zLjU4Niw4LTgsOGMtNC40MjIsMC04LDMuNTgyLTgsOHMzLjU3OCw4LDgsOGgxMjhjNC40MjIsMCw4LTMuNTgyLDgtOCAgICBTMzE4Ljc3Miw0MDguMDA0LDMxNC4zNSw0MDguMDA0eiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRDIwMDsiIGQ9Ik00MTMuMzc0LDE5Ni4wMDRjMC0yLjM5NSwwLjkzLTQuNjQxLDIuNjI1LTYuMzM2YzcuNTM5LTcuNTM1LDcuNTM5LTE5Ljc5MywwLTI3LjMyOCAgICBsLTk1LjE0MS05NS4xNDRjNi4wNTUtOS45MzQsMTQuMDg2LTMxLjA4NiwwLjg1OS02Mi4zMTJjLTEuMTMzLTIuNjY0LTMuNjA5LTQuNTEyLTYuNDkyLTQuODMyICAgIGMtMi44NTItMC4zMjgtNS43MDMsMC45NDktNy4zODMsMy4zMDVjLTExLjUzOSwxNi4xNDgtMzQuNjk1LDMwLjg3MS02MS41MDgsNDcuOTE4Yy02Mi4zNjcsMzkuNjQ4LTEzOS45ODQsODguOTkyLTEzOS45ODQsMTk2LjczICAgIGMwLDkwLjY4Nyw0OC4zNTksMTMwLjA3LDYzLjE4NywxMzkuOTg0YzMuOTM3LDIuNjI1LDguNTM5LDQuMDE2LDEzLjMxMiw0LjAxNmgxMzguNjMzYzguMzIsMCwxNS45My00LjIxNSwyMC4zNTItMTEuMjgxICAgIGwxNS42OC0yNS4wOWMxMy40NzctMjEuNTU5LDEwLjcxOS00OS41NDctNi43MDMtNjguMDY2bC04NC40NTMtODkuNzIzYzguNjcyLDEuMjM4LDE5LjM1OSwyLjE2LDMxLjk5MiwyLjE2ICAgIGMzMC4yNzMsMCw0NC40MywxNS42MTcsNTYuOTE0LDI5LjM5OGM0LjIxOSw0LjY1Miw4LjIwMyw5LjA1MSwxMi41MzEsMTIuNDQ5YzYuMzgzLDUuMDA4LDE1LjUzMSw0LjQ4LDIxLjI1LTEuMjI3bDI2Ljk1My0yNi45NzMgICAgYzMuMTI1LTMuMTI1LDMuMTI1LTguMTkxLDAtMTEuMzE2QzQxNC4zMDQsMjAwLjY0NSw0MTMuMzc0LDE5OC4zOTgsNDEzLjM3NCwxOTYuMDA0eiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGOTYwMDsiIGQ9Ik0xODYuMzUxLDIxNi4wMDRjMC0xMjQsMTA5LjI3Ny0xMjMuMzM0LDEyNy45ODQtMjE1LjkzM2MtMi41NDEsMC4wMDMtNC45ODksMS4xNzctNi40OTIsMy4yODUgICAgYy0xMS41MzksMTYuMTQ4LTM0LjY5NSwzMC44NzEtNjEuNTA4LDQ3LjkxOGMtNjIuMzY3LDM5LjY0OC0xMzkuOTg0LDg4Ljk5Mi0xMzkuOTg0LDE5Ni43MyAgICBjMCw5MC42ODcsNDguMzU5LDEzMC4wNyw2My4xODcsMTM5Ljk4NGMzLjkzNywyLjYyNSw4LjUzOSw0LjAxNiwxMy4zMTIsNC4wMTZoOTEuNSAgICBDMjc0LjM1LDI5Ni42NzEsMTg2LjM1MSwyOTguMzkzLDE4Ni4zNTEsMjE2LjAwNHoiLz4KCTwvZz4KCTxnPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNCOUJCQzE7IiBkPSJNNDAxLjcxOCw0NDUuMDYybC00Mi4yNDItMzUuMjAzYy0xLjQzOC0xLjE5OS0zLjI1LTEuODU1LTUuMTI1LTEuODU1aC0yMDggICAgYy0xLjg3NSwwLTMuNjg4LDAuNjU2LTUuMTI1LDEuODU1bC00Mi4yMzQsMzUuMTk5Yy01LjQ5Miw0LjU3NC04LjY0MSwxMS4yOTctOC42NDEsMTguNDQxdjQwLjUwNGMwLDQuNDE4LDMuNTc4LDgsOCw4aDMwNCAgICBjNC40MjIsMCw4LTMuNTgyLDgtOHYtNDAuNTA4QzQxMC4zNSw0NTYuMzUxLDQwNy4yMDIsNDQ5LjYzMyw0MDEuNzE4LDQ0NS4wNjJ6Ii8+Cgk8L2c+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGOTYwMDsiIGQ9Ik0yNjYuMzUsMTI4LjAwNGMtNC40MjIsMC04LTMuNTgyLTgtOGMwLTQuNDE4LDMuNTc4LTgsOC04YzMuOTc3LDAsNy45ODQtMi4xOTksMTIuNjMzLTQuNzQ2ICAgICBjOS4xMzMtNS4wMTIsMjEuNjQ4LTExLjg1OSwzOS4xOTUtMi4yNzdjMy44ODMsMi4xMTcsNS4zMTIsNi45NzcsMy4xOTUsMTAuODU1Yy0yLjExNywzLjg3NS03LDUuMzA5LTEwLjg1MiwzLjE5MSAgICAgYy05Ljg5OC01LjM5NS0xNS40NDUtMi4zNDQtMjMuODUyLDIuMjY2QzI4MC45MjksMTI0LjQzOCwyNzQuNDIxLDEyOC4wMDQsMjY2LjM1LDEyOC4wMDR6Ii8+CgkJPC9nPgoJPC9nPgoJPGc+CgkJPGc+CgkJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjk2MDA7IiBkPSJNMjk4LjM1LDEyOC4wMDRjLTQuNDIyLDAtOC0zLjU4Mi04LTh2LThjMC00LjQxOCwzLjU3OC04LDgtOHM4LDMuNTgyLDgsOHY4ICAgICBDMzA2LjM1LDEyNC40MjIsMzAyLjc3MiwxMjguMDA0LDI5OC4zNSwxMjguMDA0eiIvPgoJCTwvZz4KCTwvZz4KCTxnPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiM4Qjg5OTY7IiBkPSJNMjUwLjM1MSw0MDguMDA0aC0xMDRjLTEuODc1LDAtMy42ODgsMC42NTYtNS4xMjUsMS44NTVsLTQyLjIzNCwzNS4xOTkgICAgYy01LjQ5Miw0LjU3NC04LjY0MSwxMS4yOTctOC42NDEsMTguNDQxdjQwLjUwNGMwLDQuNDE4LDMuNTc4LDgsOCw4aDE1MlY0MDguMDA0eiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6IzhCODk5NjsiIGQ9Ik05MC4zNTEsNDYzLjV2NDAuNTA0YzAsNC40MTgsMy41NzgsOCw4LDhoMzA0YzQuNDIyLDAsOC0zLjU4Miw4LTh2LTQwLjUwOCAgICBjMC0yLjU5OC0wLjU0OS01LjA5LTEuMzQyLTcuNDkySDkxLjY5NEM5MC44OTksNDU4LjQwOCw5MC4zNTEsNDYwLjkwMSw5MC4zNTEsNDYzLjV6Ii8+Cgk8L2c+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojNUM1NDZBOyIgZD0iTTI1MC4zNTEsNDU2LjAwNEg5MS42OTRjLTAuNzk0LDIuNDA0LTEuMzQzLDQuODk3LTEuMzQzLDcuNDk2djQwLjUwNGMwLDQuNDE4LDMuNTc4LDgsOCw4aDE1MiAgICBWNDU2LjAwNHoiLz4KCTwvZz4KCTxnPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjk2MDA7IiBkPSJNMjY2LjM1OCwxOTcuODQ0YzEuNTQ2LDAuMjIxLDMuMjMzLDAuNDE2LDQuOTA3LDAuNjEzYy0yNS4yNjMtNC45NjctMzguOTAzLTE4Ljc3Ny00Ni4wNjMtMzAuMjY2ICAgIGMtMTAuMjAzLTE2LjM2Ny0xMS40NTMtMzUuMTM3LTcuNDIyLTQ1LjIxNWMxLjY0MS00LjEwNS0wLjM1OS04Ljc1OC00LjQ2MS0xMC40MDJjLTQuMDctMS42MzMtOC43NTgsMC4zNTUtMTAuMzk4LDQuNDU3ICAgIGMtNi42NDgsMTYuNjM3LTMuMTU2LDQwLjU5NCw4LjcwMyw1OS42MjFjMTQuMzUyLDIzLjAyMywzOS4yNSwzNi45ODgsNzAuMTI1LDM5LjMyOGMwLjIwMywwLjAxNiwwLjQwNiwwLjAyMywwLjYwOSwwLjAyMyAgICBjMC4zMjUsMCwwLjYxLTAuMTM5LDAuOTI2LTAuMTc4TDI2Ni4zNTgsMTk3Ljg0NHoiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />';
                            break;
                        }
                    }
                }



                count++;
                if (count == 63) {
                    clearInterval(timer);
                }
            }, 200);

        }
    }
    main();

    let btn = document.querySelector('button');
    btn.addEventListener('click', function() {
        field.innerHTML = '';
        main();
    });
}

horse();