# How to contribute for this bot

It is very easy to contribute in this awesome bot.
Let's get started.

## Step 1
Fork this repository and clone the forked repo using the command below. ↓ 
```
git clone https://github.com/[username]/Slash
```
Here, replace `[username]` with your github username. It should look something like this. ↓ 
```
git clone https://github.com/EliusHHimel/Slash
```
After cloning this repo open the project folder with your fevourite code editor. If you're using VS Code then you can follow the steps below.

```
cd Slash
```
```
code .
```
This will open the project in your VS Code.

## Step 2
Now 
```js
const favorites = [];
```

In the `POST` route, inside the `if(color)` block, add this code to save the submitted value to the array, and write it to the console:

```js
favorites.push(color);
console.log(favorites);
```

Click __Tools__ > __Logs__ at the bottom of Glitch to see the log statement in action when you submit new colors through the form.

## Keep going! 🚀

Clearly this is not a robust data storage approach and won't persist for long! Your Node apps can use a variety of databases, like [SQLite](https://glitch.com/~glitch-hello-sqlite) and [Airtable](https://glitch.com/~glitch-hello-airtable).
