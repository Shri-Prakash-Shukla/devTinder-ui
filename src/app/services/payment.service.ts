import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

// Razorpay script index.html se load hoti hai, isliye TS ko bata rahe hain
declare var Razorpay: any;

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient);

  async pay() {
    // 1. Backend se order banwao
    const order: any = await firstValueFrom(
      this.http.post('/api/payment/order', {})
    );

    // 2. Razorpay checkout options
    const options = {
      key: environment.razorpayKey,   // tumhara Key ID (public)
      order_id: order.order_id,
      amount: order.amount,
      currency: order.currency,
      name: 'DevTinder',
      description: 'Support Us',
      handler: (response: any) => {
        // 3. Payment success → verify karo
        this.verify(response);
      },
      modal: {
        ondismiss: () => {
          console.log('Payment popup band kar diya');
        }
      }
    };

    // 4. Popup kholo
    const rzp = new Razorpay(options);

    rzp.on('payment.failed', (response: any) => {
      console.error('Payment failed:', response.error);
      alert('Payment failed: ' + response.error.description);
    });

    rzp.open();
  }

  private verify(response: any) {
    this.http.post('/api/payment/verify', {
      order_id: response.razorpay_order_id,
      payment_id: response.razorpay_payment_id,
      signature: response.razorpay_signature,
    }).subscribe({
      next: (res: any) => {
        console.log('Verify response:', res);
        alert('Thank you! Payment successful 🎉');
      },
      error: (err) => {
        console.error('Verification failed:', err);
        alert('Payment verification failed');
      }
    });
  }
}
