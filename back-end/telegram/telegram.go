package telegram

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
)

// SendMessage sends a plain text message
func SendMessage(token, chatId, message string) error {
	url := fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", token)

	fmt.Println("Sending message:", message)

	body := map[string]string{
		"chat_id": chatId,
		"text":    message,
	}
	msg, err := json.Marshal(body)
	if err != nil {
		return fmt.Errorf("error on marshaling: %v", err)
	}

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(msg))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("error sending request: %v", err)
	}
	defer resp.Body.Close()

	fmt.Println("Message sent")
	return nil
}

// SendPhoto sends a photo with optional caption
func SendPhoto(token, chatId string, file multipart.File, fileName, caption string) error {
	url := fmt.Sprintf("https://api.telegram.org/bot%s/sendPhoto", token)

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)

	_ = writer.WriteField("chat_id", chatId)
	if caption != "" {
		_ = writer.WriteField("caption", caption)
	}

	part, err := writer.CreateFormFile("photo", fileName)
	if err != nil {
		return fmt.Errorf("error creating form file: %v", err)
	}
	_, err = io.Copy(part, file)
	if err != nil {
		return fmt.Errorf("error copying file data: %v", err)
	}
	_ = writer.Close()

	req, err := http.NewRequest("POST", url, body)
	if err != nil {
		return fmt.Errorf("error creating request: %v", err)
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("error sending request: %v", err)
	}
	defer resp.Body.Close()

	fmt.Println("Photo with caption sent")
	return nil
}

// SendPDF sends a PDF (document) with optional caption
func SendPDF(token, chatId string, file multipart.File, fileName, caption string) error {
	url := fmt.Sprintf("https://api.telegram.org/bot%s/sendDocument", token)

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)

	_ = writer.WriteField("chat_id", chatId)
	if caption != "" {
		_ = writer.WriteField("caption", caption)
	}

	part, err := writer.CreateFormFile("document", fileName)
	if err != nil {
		return fmt.Errorf("error creating form file: %v", err)
	}
	_, err = io.Copy(part, file)
	if err != nil {
		return fmt.Errorf("error copying file data: %v", err)
	}
	_ = writer.Close()

	req, err := http.NewRequest("POST", url, body)
	if err != nil {
		return fmt.Errorf("error creating request: %v", err)
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("error sending request: %v", err)
	}
	defer resp.Body.Close()

	fmt.Println("PDF with caption sent")
	return nil
}
