from pymongo import MongoClient
import os
mongodb_uri = os.getenv("MONGODB_URI")
# Fungsi untuk membuat koneksi ke MongoDB
def connect_to_mongodb():
    try:
        client = MongoClient(mongodb_uri)  # Ganti URL sesuai dengan konfigurasi MongoDB Anda
        db = client["nama_database"]  # Ganti nama_database dengan nama database yang Anda gunakan
        return db
    except Exception as e:
        print(f"Koneksi MongoDB gagal: {e}")
        return None

# Fungsi untuk menutup koneksi MongoDB
def close_mongodb_connection(db):
    try:
        if db:
            db.client.close()
            print("Koneksi MongoDB ditutup")
    except Exception as e:
        print(f"Error saat menutup koneksi MongoDB: {e}")
