package database

import (
	"log"
	"main/models"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DbInstance struct {
	Db *gorm.DB
}

var Database DbInstance

func ConnectDb() {
	dsn := "root:@tcp(127.0.0.1:3306)/shopping?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to the database!\n", err.Error())
		os.Exit(2)
	}
	log.Println("Connected to the database successfuly")
	db.Logger = logger.Default.LogMode(logger.Info)
	log.Println("Running Migrations")
	db.AutoMigrate(&models.User{}, &models.Product{}, &models.Order{}, &models.Not{})

	Database = DbInstance{Db: db}
}
