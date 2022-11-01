package main

import (
	"log"
	"main/database"
	"main/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func welcome(c *fiber.Ctx) error {

	return c.SendString("Welcome to my awesome API")
}

// func toplama(sayi1 int, sayi2 int) int { //003EMY = 5

// 	toplam := sayi1 + sayi2 //003EMY = 6
// 	return toplam
// }

func testDeneme(c *fiber.Ctx) error {

	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return err
	}

	user := models.User{
		FirstName: data["first_name"],
		LastName:  data["last_name"],
		CreatedAt: time.Now(),
	}

	database.Database.Db.Create(&user)
	// eskiDeger := 5 //003EMG = 5
	// yeniDeger := 0
	// yeniDeger = toplama(1, eskiDeger) //003EMG = 5
	return c.JSON(user)
}
func productCreate(c *fiber.Ctx) error {
	var data map[string]string

	err := c.BodyParser(&data)
	if err != nil {
		return c.JSON(map[string]interface{}{
			"err":     err,
			"message": "Hata var gardaş",
		})

	}
	product := models.Product{
		Name:         data["name"],
		SerialNumber: data["serial_number"],
		CreatedAt:    time.Now(),
	}

	database.Database.Db.Create(&product)

	return c.JSON(map[string]interface{}{
		"product": product,
		"mesage":  "Kayıt Başarılı",
	})

}
func productDelete(c *fiber.Ctx) error {
	var data map[string]interface{}

	err := c.BodyParser(&data)
	if err != nil {
		return c.JSON(map[string]interface{}{
			"err":     err,
			"message": "Hata var gardaş",
		})

	}

	database.Database.Db.Where("id = ?", data["id"]).Delete(&models.Product{})
	return c.JSON(map[string]interface{}{

		"message": "Silme başarılı",
	})
}
func productUpdate(c *fiber.Ctx) error {
	var data map[string]interface{}

	err := c.BodyParser(&data)
	if err != nil {
		return c.JSON(map[string]interface{}{
			"err":     err,
			"message": "Hata var gardaş",
		})
	}

	product := models.Product{}

	// database.Database.Db.Model(&product).Where("id = ?", data["id"]).Update("name", data["name"].(string))
	database.Database.Db.Model(&product).Where("id = ?", data["id"]).Updates(map[string]interface{}{
		"name":          data["name"],
		"serial_number": data["serial_number"],
	})

	return c.JSON(map[string]interface{}{
		"message": "Başarılı",
	})

}

func product(c *fiber.Ctx) error {

	product := []models.Product{}

	database.Database.Db.Find(&product)

	return c.JSON(map[string]interface{}{
		"message": "başarılı",
		"product": product,
	})
}
func not(c *fiber.Ctx) error {

	not := []models.Not{}

	database.Database.Db.Find(&not)

	return c.JSON(map[string]interface{}{
		"message": "başarılı",
		"not":     not,
	})
}
func noteCreate(c *fiber.Ctx) error {
	var data map[string]interface{}

	err := c.BodyParser(&data)
	if err != nil {
		return c.JSON(map[string]interface{}{
			"err":     err,
			"message": "Hata var",
		})

	}

	note := models.Not{
		Title:      data["title"].(string),
		NoteDetail: data["note_detail"].(string),
		CreatedAt:  time.Now(),
	}

	database.Database.Db.Create(&note)

	return c.JSON(map[string]interface{}{
		"note":    note,
		"status":  200,
		"message": "Not Kayıt Başarılı",
	})

}
func noteEdit(c *fiber.Ctx) error {
	var data map[string]interface{}

	err := c.BodyParser(&data)
	if err != nil {
		return c.JSON(map[string]interface{}{
			"err":     err,
			"message": "Hata var ",
		})
	}

	note := models.Not{}

	// database.Database.Db.Model(&product).Where("id = ?", data["id"]).Update("name", data["name"].(string))
	database.Database.Db.Model(&note).Where("id = ?", data["id"]).Updates(map[string]interface{}{
		"title":       data["title"],
		"note_detail": data["note_detail"],
		"id":          data["id"],
	})

	c.Status(200)
	return c.JSON(map[string]interface{}{
		"message":   "Başarılı",
		"changeNot": note,
	})

}
func noteDelete() {

}
func main() {
	app := fiber.New()

	database.ConnectDb()
	// Default config
	app.Use(cors.New())

	// Or extend your config for customization
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	app.Get("/api", welcome)
	app.Post("/apis", testDeneme)
	app.Post("/product/create", productCreate)
	app.Get("/product/delete", productDelete)
	app.Post("/product/update", productUpdate)

	app.Get("/product", product)
	app.Get("/not", not)
	app.Post("/note/create", noteCreate)

	app.Post("/note/edit", noteEdit)

	app.Post("/note/delete", noteDelete)

	log.Fatal(app.Listen(":80"))

}
