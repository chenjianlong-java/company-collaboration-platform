import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs';

export interface DragData {
    tag: string,
    data: any
}

@Injectable()
export class DragDropService {
    // BehaviorSubject总能记住上一次的值
    private _dragData = new BehaviorSubject<DragData>(null);
    
    setDragData(data: DragData) {
        this._dragData.next(data);
    }
    
    getDragData(): Observable<DragData> {
        return this._dragData.asObservable();
    }
    
    // 清空数据
    clearDragData() {
        this._dragData.next(null);
    }
}
