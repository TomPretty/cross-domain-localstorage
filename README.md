# Cross domain localstorage

This is a demo project showing off how to access `localStorage` from another domain. In this project a page on `dom-a.thegulocal.com` is able to access some data stored in `localStorage` on `dom-b.thegulocal.com`.

## How it works

### dom-a

The page on `dom-a.thegulocal.com` iframes in a special page on `dom-b.thegulocal.com`

```html
<iframe id="iframe" src="https://dom-b.thegulocal.com/iframe.html" frameborder="0"></iframe>
```

It then sends a `postMessage` to the iframe to request the data. It also sets up an `onmessage` handler to listen to the reply and update the UI when it gets the data.

## dom-b

There are two pages on `dom-b.thegulocal.com`: `index.html` and `iframe.html`. `index.html` provides a simple UI to set `localStorage`. `iframe.html` is intended to be iframed into another page. It sets up an `onmessage` listener to wait for the data request which then sends a `postMessage` back to its parent with the data.

## How to run

Use `dev-nginx` to have nginx serve `dom-a.thegulocal.com` and `dom-b.thegulocal.com`

```bash
dev-nginx setup-app ngix/conf.yml
```

Then serve the `dom-a` directory on port `7001` and `dom-b` on `7002`. Using `python` this looks like:

```bash
cd dom-a
python -m SimpleHTTPServer 7001
```

and

```bash
cd dom-b
python -m SimpleHTTPServer 7002
```

## How to implement on `theguardian.com`

This would require us to serve a special page (`iframe.html`) on `theguardian.com` that is designed to be iframed into the support site.
