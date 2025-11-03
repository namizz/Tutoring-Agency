package main

import (
	"encoding/json"
	"fmt"
	"mime/multipart"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/namizz/go-backend/telegram"
)

// CORS middleware
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	err := godotenv.Load(".env.local")
	if err != nil {
		fmt.Println("Error loading .env file")
		return
	}

	token := os.Getenv("TOKEN")
	chatId := os.Getenv("CHAT_ID")

	if token == "" || chatId == "" {
		fmt.Println("TOKEN or CHAT_ID not set in environment variables")
		return
	}

	mux := http.NewServeMux()

	// Send message route
	mux.HandleFunc("/send", func(w http.ResponseWriter, r *http.Request) {
		var data struct {
			Message string `json:"message"`
		}

		if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		message := data.Message

		err := telegram.SendMessage(token, chatId, message)
		if err != nil {
			http.Error(w, "Failed to send message", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "Message sent successfully")
	})

	// Send photo with caption
	mux.HandleFunc("/photo", func(w http.ResponseWriter, r *http.Request) {
		r.ParseMultipartForm(10 << 20)

		file, handler, err := r.FormFile("photo")
		if err != nil {
			http.Error(w, "Error parsing photo", http.StatusBadRequest)
			return
		}
		defer file.Close()

		caption := r.FormValue("caption")

		err = telegram.SendPhoto(token, chatId, multipart.File(file), handler.Filename, caption)
		if err != nil {
			http.Error(w, "Failed to send photo", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "Photo with caption sent successfully")
	})
	// Awake Server
	mux.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("Ping received at %s from %s\n", time.Now().Format(time.RFC3339), r.RemoteAddr)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "Server awake!")
	})

	// Send PDF with caption
	mux.HandleFunc("/pdf", func(w http.ResponseWriter, r *http.Request) {
		err = r.ParseMultipartForm(10 << 20)
		if err != nil {
			http.Error(w, "Error parsing form data", http.StatusBadRequest)
			return
		}

		file, handler, err := r.FormFile("pdf")
		if err != nil {
			http.Error(w, "Error retrieving PDF", http.StatusBadRequest)
			return
		}
		defer file.Close()

		caption := r.FormValue("caption")

		err = telegram.SendPDF(token, chatId, multipart.File(file), handler.Filename, caption)
		if err != nil {
			http.Error(w, "Failed to send PDF", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "PDF with caption sent successfully")
	})

	fmt.Println("Server running at http://localhost:8080")
	http.ListenAndServe(":8080", enableCORS(mux))
}
