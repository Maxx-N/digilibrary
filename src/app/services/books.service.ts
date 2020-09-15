import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  selectedBook: Book;
  selectedBookSubject: Subject<Book> = new Subject<Book>();

  private books: Book[] = [
    new Book(
      'Les Misérables',
      1862,
      'category1',
      false,
      false,
      'Le destin de Jean Valjean, forçat échappé du bagne, est bouleversé par sa rencontre avec Fantine. Mourante et sans le sou, celle-ci lui demande de prendre soin de Cosette, sa fille confiée aux Thénardier. Ce couple d’aubergistes, malhonnête et sans scrupules, exploitent la fillette jusqu’à ce que Jean Valjean tienne sa promesse et l’adopte. Cosette devient alors sa raison de vivre. Mais son passé le rattrape et l’inspecteur Javert le traque…',
      'https://vignette.wikia.nocookie.net/les-miserables/images/1/18/Premi%C3%A8re_parution_des_Mis%C3%A9rables.jpg/revision/latest/top-crop/width/360/height/450?cb=20161220203848&path-prefix=fr'
    ),
    new Book(
      "La Vérité sur l'Affaire Harry Quebert",
      2012,
      'Policier',
      false,
      false,
      'À la fin de l’été 1975, à Aurora, dans le New Hampshire, Nola Kellergan, une jeune fille de 15 ans, disparaît dans des conditions mystérieuses. Au printemps 2008, à New York, Marcus Goldman, jeune écrivain à succès, est dans la tourmente: il est incapable d’écrire le nouveau roman qu’il doit remettre à son éditeur. Dans l’espoir de retrouver l’inspiration, il décide de se rendre à Aurora, auprès de son ami et ancien professeur d’université, Harry Quebert, l’un des écrivains les plus respectés du pays. C’est peu après le retour de Marcus à New York que tout bascule: le cadavre de Nola Kellergan est retrouvé dans la propriété d’Harry Quebert. Celui-ci, accusé du meurtre de la jeune femme, est immédiatement arrêté par la police. Convaincu de l’innocence de Harry, Marcus abandonne tout pour se rendre dans le New Hampshire et mener sa propre enquête. Il est rapidement dépassé par les événements: l’enquête s’enlise et il fait l’objet de menaces. Pour innocenter Harry et sauver sa carrière d’écrivain, il doit absolument répondre à trois questions: Qui a tué Nola Kellergan? Que s’est-il passé à Aurora durant l’été 1975? Et comment écrit-on un roman à succès ?',
      'https://img.over-blog-kiwi.com/0/93/50/08/20140806/ob_500a98_la-verite-sur-4502.jpg'
    ),
    new Book(
      "L'Enigme de la chambre 622",
      2020,
      'Policier',
      false,
      false,
      'Une nuit de décembre, un meurtre a lieu au Palace de Verbier, dans les Alpes suisses. L’enquête de police n’aboutira jamais. Des années plus tard, au début de l’été 2018, lorsqu’un écrivain se rend dans ce même hôtel pour y passer des vacances, il est loin d’imaginer qu’il va se retrouver plongé dans cette affaire. Que s’est-il passé dans la chambre 622 du Palace de Verbier?',
      'https://images-na.ssl-images-amazon.com/images/I/41FhoGm9LJL._SX342_BO1,204,203,200_.jpg'
    ),
    new Book(
      "L'Assassin Royal",
      1995,
      'Fantastique',
      false,
      false,
      "Bâtard du prince chevalerie, le jeune Fitz grandit dans l'ombre de la forteresse de Castelcerf, où le roi subtil ambitionne de faire de lui son assassin personnel. Mais pour survivre, et avant même d'apprendre à manier la lame, il lui faudra faire preuve d'une connaissance parfaite des arcanes de la politique.",
      'https://static.fnac-static.com/multimedia/Images/FR/NR/33/1b/55/5577523/1540-1/tsp20160704172754/Premiere-epoque.jpg'
    ),
  ];

  getBooks(): Book[] {
    return this.books.slice();
  }

  getBooksChronologically(): Book[] {
    return this.getBooks().sort((book1, book2) => {
      return book1.year > book2.year ? -1 : +1;
    });
  }
}
