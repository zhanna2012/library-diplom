export interface BooksModelApi {
  kind: string,
  totalItems: number,
  items: BooksModel[]
}
 export interface BooksModel {
   volumeInfo: {
     title: string,
     imageLinks: {
       thumbnail: string
     }
   }
 }

