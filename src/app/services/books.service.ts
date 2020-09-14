import { Injectable } from '@angular/core';

import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  books: Book[] = [
    new Book('Les Misérables', 1862, 'category1', false, false, 'https://vignette.wikia.nocookie.net/les-miserables/images/1/18/Premi%C3%A8re_parution_des_Mis%C3%A9rables.jpg/revision/latest/top-crop/width/360/height/450?cb=20161220203848&path-prefix=fr'),
    new Book('La Vérité sur l\'Affaire Harry Quebert', 2012, 'Policier', false, false, 'https://img.over-blog-kiwi.com/0/93/50/08/20140806/ob_500a98_la-verite-sur-4502.jpg'),
    new Book('L\'Enigme de la chambre 622', 2020, 'Policier', false, false, 'https://images-na.ssl-images-amazon.com/images/I/41FhoGm9LJL._SX342_BO1,204,203,200_.jpg'),
    new Book('L\'Assassin Royal', 1995, 'Fantastique', false, false, 'https://static.fnac-static.com/multimedia/Images/FR/NR/33/1b/55/5577523/1540-1/tsp20160704172754/Premiere-epoque.jpg'),
  ];
}
