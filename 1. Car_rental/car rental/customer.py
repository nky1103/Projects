# customer.py
from car_rental import CarRental

class Customer:
    def __init__(self, name):
        self.name = name
    
    def request_cars(self, rental, num_cars, rental_mode):
        return rental._rent_car(num_cars, rental_mode)
    
    def return_cars(self, rental, rental_start_time, rental_mode, num_cars):
        return rental.return_cars(rental_start_time, rental_mode, num_cars)
