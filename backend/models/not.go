package models

import "time"

type Not struct {
	ID uint `json:"id" gorm:"primaryKey"`

	Title      string `json:"title"`
	NoteDetail string `json:"note_detail"`
	CreatedAt  time.Time
}
