import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable()
export class FirestoreProvider {

  constructor(private afs: AngularFirestore) {
  }

  doc(path: string) {
    return this.afs.doc(`${path}`).snapshotChanges().map(change => {
      let id = change.payload.id;
      return change.payload.exists ? ({id, ...change.payload.data(), ...({exists: true})}) : null;
    });
  }

  collection(path: string, query?: AFSQuery) {
    return this.afs.collection(`${path}`, ref => query ? query.exec(ref) : ref).snapshotChanges().map(changes => {
      return changes.map(c => ({id: c.payload.doc.id, ...c.payload.doc.data()}));
    });
  }

  add(path: string, data: any) {
    return this.afs.collection(`${path}`).add(data);
  }

  set(path: string, id: string, data: any) {
    return this.afs.doc(`${path}/${id}`).set(data);
  }

  update(path: string, id: string, data: any) {
    return this.afs.doc(`${path}/${id}`).update(data);
  }

  delete(path: string, id: string) {
    return this.afs.doc(`${path}/${id}`).delete();
  }

  async deleteCol(path: string) {
    const batch = this.afs.firestore.batch();
    const qs = await this.afs.collection(path).ref.get();
    qs.forEach(doc => batch.delete(doc.ref));
    return batch.commit();
  }

  get newId() {
    return this.afs.createId();
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

}

export class AFSQuery {
  where?: Array<[string | firebase.firestore.FieldPath, firebase.firestore.WhereFilterOp, any]>;
  orderBy?: string | firebase.firestore.FieldPath;
  limit?: number;
  startAt?: string;
  startAfter?: string;
  endAt?: string;
  endBefore?: string;

  exec(ref: firebase.firestore.CollectionReference) {
    let query: any = ref;

    if (this.where) {
      for (let w of this.where) {
        query = query.where(w[0], w[1], w[2]);
      }
    }

    if (this.orderBy)
      query = query.orderBy(this.orderBy);

    if (this.limit)
      query = query.limit(this.limit);

    if (this.startAt)
      query = query.startAt(this.startAt);

    if (this.startAfter)
      query = query.startAfter(this.startAfter);

    if (this.endAt)
      query = query.endAt(this.endAt);

    if (this.endBefore)
      query = query.endBefore(this.endBefore);
    
    return query;
  }
}
