import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany 
  } from 'typeorm';
  import { Booking } from './booking.entity';
  
  @Entity('flights')
  export class Flight {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    number: string;
  
    @Column()
    from: string;
  
    @Column()
    to: string;
  
    @Column()
    departureTime: string;
  
    @Column()
    arrivalTime: string;
  
    @Column()
    date: string;
  
    @Column()
    baggageAllowance: number;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
  
    @Column({ nullable: true })
    gate: string;
  
    @Column({ default: true })
    isActive: boolean;
  
    @Column('simple-array', { default: '' })
    occupiedSeats: string[];
  
    @OneToMany(() => Booking, booking => booking.flight)
    bookings: Booking[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }