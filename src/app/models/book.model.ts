import {Author} from './author.model';

export class Book {
constructor (
  public title : string,
  public year : number,
  public category : string,
  public isToRead : boolean,
  public isFinished : boolean,
  public imageUrl : string,

) {}
}
