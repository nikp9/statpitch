package main

import (
	"crypto/tls"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"sync/atomic"
)

var backends = []string{
	"http://127.0.0.1:3000",
	"http://127.0.0.1:3001",
	"http://127.0.0.1:3002",
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
	log.Println("Starting Go Load Balancer with TLS on :443")

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		target := pickNext()
		proxy := httputil.NewSingleHostReverseProxy(target)
		proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, e error) {
			http.Error(w, "Upstream error: "+e.Error(), http.StatusBadGateway)
		}
		proxy.ServeHTTP(w, r)
	})

	server := &http.Server{
		Addr:    ":443",
		Handler: handler,
		TLSConfig: &tls.Config{
			MinVersion: tls.VersionTLS12,
		},
	}

	certFile := "/etc/letsencrypt/live/api.statpitch.com/fullchain.pem"
	keyFile := "/etc/letsencrypt/live/api.statpitch.com/privkey.pem"

	log.Fatal(server.ListenAndServeTLS(certFile, keyFile))
}
