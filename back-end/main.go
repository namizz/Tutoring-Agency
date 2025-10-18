package main

import (
	"encoding/json"
	"fmt"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/namizz/go-backend/telegram"
)



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

	http.HandleFunc("/send", func(w http.ResponseWriter, r *http.Request) {
		var data struct {
			Message string `json:"message"`
		}
		
		if err := json.NewDecoder(r.Body).Decode(&data); err != nil{
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}
		message := data.Message

		err := telegram.SendMessage(token, chatId, message)
		if err != nil {
			http.Error(w, "Failed to send message", http.StatusInternalServerError)
			return
		}

	})

	http.HandleFunc("/photo", func(w http.ResponseWriter, r *http.Request) {
		r.ParseMultipartForm(10 << 20) 
		file, handler, err := r.FormFile("photo")
		if err != nil {
			http.Error(w, "Error parsing form data", http.StatusBadRequest)
			return
		}

		defer file.Close()

		err = telegram.SendPhoto(token, chatId, multipart.File(file), handler.Filename)
		if err != nil {
			http.Error(w, "Failed to send photo", http.StatusInternalServerError)
			return
		}
	})

	http.HandleFunc("/pdf", func(w http.ResponseWriter, r *http.Request) {
		err = r.ParseMultipartForm(10 << 20)
		if err != nil {
			http.Error(w, "Error parsing form data", http.StatusBadRequest)
			return
		}
		file, handler, err := r.FormFile("pdf")
		if err != nil {
			http.Error(w, "Error retrieving the file", http.StatusBadRequest)
			return
		}
		defer file.Close()

		err = telegram.SendPDF(token, chatId, multipart.File(file), handler.Filename)
		if err != nil {
			http.Error(w, "Failed to send document", http.StatusInternalServerError)
			return
		}

	})
	fmt.Println("http://localhost:8080")
	http.ListenAndServe(":8080", nil)



	

	

}