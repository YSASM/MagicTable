git add .
git commit -m update
git config --global http.proxy http://127.0.0.1:7890
git push
git config --global --unset  http.proxy