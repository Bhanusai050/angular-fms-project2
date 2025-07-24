import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface LoginResponse {
  name(arg0: string, name: any): unknown;
  token: string;
  Username?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:44394';

  constructor(private http: HttpClient) {}

  addAnimal(animalData: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/animals/add`, animalData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Animal added:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  deleteAnimal(animalId: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/api/animals/delete/${animalId}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap(() => console.log('✅ Animal deleted:', animalId)),
        catchError((err) => this.handleError(err))
      );
  }

  updateAnimal(id: number, animalData: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/api/animals/update/${id}`, animalData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Animal updated:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  getAnimals(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/api/animals/get`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Animals fetched:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  getAnimalBatches(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/api/animalbatch`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Animal Batches fetched:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  addAnimalBatch(batchData: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/animalbatch`, batchData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Animal Batch added:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  updateAnimalBatch(id: number, batchData: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/api/animalbatch/${id}`, batchData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Animal Batch updated:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  deleteAnimalBatch(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/api/animalbatch/${id}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap(() => console.log('✅ Animal Batch deleted:', id)),
        catchError((err) => this.handleError(err))
      );
  }

  getVendors(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/api/vendor/all`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Vendors fetched:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  addVendor(vendorData: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/vendor/add`, vendorData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Vendor added:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  updateVendor(id: number, vendorData: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/api/vendor/update/${id}`, vendorData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Vendor updated:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  deleteVendor(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/api/vendor/delete/${id}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap(() => console.log('✅ Vendor deleted:', id)),
        catchError((err) => this.handleError(err))
      );
  }

  getVendorTypes(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.baseUrl}/api/vendor/types`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Vendor types fetched:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  getFeedTypes(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/api/feedtypes/all`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Feed types fetched:', res)),
        catchError((err) => this.handleError(err))
      );
  }
  

  addFeed(feedData: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/feedinventory/add`, feedData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Feed added:', res)),
        catchError((err) => this.handleError(err))
      );
  }

 
  getFeedInventory(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/api/feedinventory`);
}

  addFeedInventory(feedData: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/feedinventory/add`, feedData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Feed inventory added:', res)),
        catchError((err) => this.handleError(err))
      );
  }
  updateFeedInventory(payload: any): Observable<any> {
  return this.http.put(`/api/feed-inventory/${payload.FeedID}`, payload);
}


  updateFeed(id: number, feedData: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/api/feedinventory/update/${id}`, feedData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Feed updated:', res)),
        catchError((err) => this.handleError(err))
      );
  }

 
  deleteFeed(feedID: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/api/feedinventory/delete/${feedID}`, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }).pipe(
    tap(() => console.log(`🗑️ Feed deleted: ${feedID}`)),
    catchError((err) => this.handleError(err))
  );
}


  submitContact(formData: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/Postcontactmessages`, formData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap(() => console.log('✅ Contact form submitted')),
        catchError((err) => this.handleError(err))
      );
  }

  register(data: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/register`, data, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Registered:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  login(email: string, password: string, remember: boolean): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.baseUrl}/login`,
        { email, password },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(
        tap((res) => {
          const storage = remember ? localStorage : sessionStorage;
          storage.setItem('auth_token', res.token);
          if (remember) {
            localStorage.setItem('remember_email', email);
          } else {
            localStorage.removeItem('remember_email');
          }
        }),
        catchError((err) => this.handleError(err))
      );
  }

  sendOtp(email: string): Observable<any> {
    return this.http
      .post(
        `${this.baseUrl}/send-otp`,
        { email },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  addCustomer(customerData: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/customers/add`, customerData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Customer added:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  getCustomers(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/api/customers/get`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Customers fetched:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  updateCustomer(id: number, customerData: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/api/customers/update/${id}`, customerData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Customer updated:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/api/customers/delete/${id}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap(() => console.log('✅ Customer deleted:', id)),
        catchError((err) => this.handleError(err))
      );
  }

  addOrder(orderData: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/orders/add`, orderData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Order added:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  getOrders(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/api/orders/get`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Orders fetched:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  updateOrder(id: number, orderData: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/api/orders/update/${id}`, orderData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Order updated:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  deleteOrder(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/api/orders/delete/${id}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap(() => console.log('✅ Order deleted:', id)),
        catchError((err) => this.handleError(err))
      );
  }

  addExpense(expenseData: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/expenses/add`, expenseData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Expense added:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  getExpenses(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/api/expenses/getall`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Expenses fetched:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  updateExpense(id: number, data: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/api/expenses/update/${id}`, data, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Expense updated:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  deleteExpense(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/api/expenses/delete/${id}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap(() => console.log('✅ Expense deleted:', id)),
        catchError((err) => this.handleError(err))
      );
  }

  addInvestment(investmentData: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/investments/add`, investmentData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Investment added:', res)),
        catchError((err) => this.handleError(err))
      );
  }

  deleteInvestment(investmentId: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/api/investments/delete/${investmentId}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap(() => console.log('✅ Investment deleted:', investmentId)),
        catchError((err) => this.handleError(err))
      );
  }

  updateInvestment(id: number, investmentData: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/api/investments/update/${id}`, investmentData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res) => console.log('✅ Investment updated:', res)),
        catchError((err) => this.handleError(err))
      );
  }

 getInvestments(): Observable<any[]> {
  return this.http
    .get<any[]>(`${this.baseUrl}/api/investments/get`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    })
    .pipe(
      tap((res) => console.log('✅ Investments fetched:', res)),
      catchError((err) => this.handleError(err))
    );
}



  get rememberedEmail(): string {
    return localStorage.getItem('remember_email') || '';
  }

  private handleError(err: any): Observable<never> {
    console.error('API Error:', err); // Log full error for debugging
    const msg =
      err.status === 0
        ? 'Network error – unable to reach the server.'
        : err.status === 401
        ? 'Unauthorized – please log in again.'
        : err.status >= 400 && err.status < 500
        ? 'Invalid request or input – please check your data.'
        : 'Server error – please try again later.';
    return throwError(() => new Error(msg));
  }
}