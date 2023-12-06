import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, imgDB } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FcAddImage } from "react-icons/fc";

export const NovelCrud = () => {
  const [Booktitle, setBooktitle] = useState("");
  const [Bookdesc, setBookdesc] = useState("");
  const [BookPrice, setBookPrice] = useState("");
  const [BookDate, setBookDate] = useState("");
  const [BookCover, setBookCover] = useState(null);
  const [BookPdf, setBookPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = collection(db, "Books", "All_Genre", "Novel");

  const handleAddBook = async () => {
    if (!BookCover || !BookPdf || loading) return;
    setLoading(true);

    const imgRef = ref(imgDB, `WebsiteProject/Books/${BookCover.name + uuidv4()}`);
    const pdfRef = ref(imgDB, `WebsiteProject/Books/${BookPdf.name + uuidv4()}`);
    try {
      // Upload image
      await uploadBytes(imgRef, BookCover);
      const imageUrl = await getDownloadURL(imgRef);

      // Upload PDF
      await uploadBytes(pdfRef, BookPdf);
      const pdfUrl = await getDownloadURL(pdfRef);

      // Add document to Firestore
      await addDoc(value, {
        title: Booktitle,
        decs: Bookdesc,
        price: BookPrice,
        date: BookDate,
        img: imageUrl,
        BookPdf: pdfUrl,
      });

      alert("Book data & Image Upload");

      // Reset form fields after successful upload
      setBooktitle("");
      setBookdesc("");
      setBookPrice("");
      setBookDate("");
      setBookCover(null);
      setBookPdf(null);
    } catch (error) {
      console.error("Error uploading image or adding document:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex flex-col m-2 space-y-5">
      <input
        value={Booktitle}
        onChange={(e) => setBooktitle(e.target.value)}
        placeholder="ចំណងជើងសៀវភៅ"
        className="p-2 "
      />
      <input
        value={Bookdesc}
        onChange={(e) => setBookdesc(e.target.value)}
        placeholder="ព័ត៌មានរបស់សៀវភៅ"
        className="p-2 "
      />
      <input
        value={BookPrice}
        onChange={(e) => setBookPrice(e.target.value)}
        className="p-2"
        placeholder="តម្លៃ សៀវភៅ"
      />
      <input
        value={BookDate}
        onChange={(e) => setBookDate(e.target.value)}
        className="p-2"
        placeholder="ថ្ងៃ ខែ ឆ្នាំ ផលិត"
      />
      <label className="relative overflow-hidden inline-block bg-white w-fit px-10 py-4">
        <input
          type="file"
          onChange={(e) => setBookCover(e.target.files[0])}
          accept="image/*"
          className="font-[100px] absolute l-0 t-0 opacity-0 "
        />
        <span className="flex text-3xl ">
          <FcAddImage className="mt-1 mr-2" /> Upload Image (4 x 6)
        </span>
      </label>
      <label className="relative overflow-hidden inline-block bg-white w-fit px-10 py-4">
        <input
          type="file"
          onChange={(e) => setBookPdf(e.target.files[0])}
          accept=".pdf"
          className="font-[100px] absolute l-0 t-0 opacity-0"
        />
        <span className="flex text-3xl ">
          <FcAddImage className="mt-1 mr-2" /> Upload Book PDF
        </span>
      </label>
      <button onClick={handleAddBook} className="bg-blue-500 w-32 rounded-lg p-2 text-white">
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};