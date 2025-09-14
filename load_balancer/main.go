package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"sync/atomic"
)

var backends = []string{
	"http://127.0.0.1:32768",
	"http://127.0.0.1:32769",
	"http://127.0.0.1:32770",
}

var current uint32

func pickNext() *url.URL {
	i := atomic.AddUint32(&current, 1)
	u, err := url.Parse(backends[(int(i)-1)%len(backends)])
	if err != nil {
		log.Fatalf("invalid backend URL: %v", err)
	}
	return u
}

func main() {
	log.Println("Starting Go Load Balancer on :8080")

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		target := pickNext()
		proxy := httputil.NewSingleHostReverseProxy(target)
		proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, e error) {
			http.Error(w, "Upstream error: "+e.Error(), http.StatusBadGateway)
		}
		proxy.ServeHTTP(w, r)
	})

	log.Fatal(http.ListenAndServe(":80", handler))
}