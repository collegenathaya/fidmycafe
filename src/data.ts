import { Cafe, Review } from './types';

export const INITIAL_CAFES: Cafe[] = [
  {
    id: 'CAFE-001',
    name: 'Kopi Nako Tangerang',
    category: 'Coffee Shop',
    facilities: ['Wi-Fi Cepat', 'Outdoor Area', 'Parkir Luas'],
    address: 'Jl. Alam Utama Blok RH No.5, Pakulonan, Kec. Serpong, Kota Tangerang Selatan, Banten 15325',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-002',
    name: 'Mattin Coffee',
    category: 'Coffee Shop',
    facilities: ['Outdoor', 'Indoor Area', 'Fasilitas Eatery', 'Less Waste'],
    address: 'Kota Jl. Harapan Indah Raya No.11B LOT 19, Kav. I2-3, Pusaka Rakyat, Tarumajaya, Bekasi Regency, West Java 17214',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-003',
    name: 'Agreya Coffee',
    category: 'WFC',
    facilities: ['Fasilitas Lengkap', 'Buka 24 jam', 'Ramah WFC'],
    address: 'Jl. Kolonel Sugiono Z No.15, RT.4/RW.1, Duren Sawit, Durensawit, East Jakarta City, RT.4/RW.1, Duren Sawit, Kec. Duren Sawit, Jakarta, Daerah Khusus Ibukota Jakarta 13440',
    imageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-004',
    name: 'Ajeep Coffee',
    category: 'Coffee Shop',
    facilities: ['Harga Terjangkau', 'Menu Signature yang Unik', 'Fasilitas Lengkap'],
    address: 'Ruko Cemara - Grand, Jl. Harapan Indah Boulevard Blk. U6 No.17, RT.10/RW.8, Pusaka Rakyat, Kec. Tarumajaya, Kabupaten Bekasi, Jawa Barat 17214',
    imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-005',
    name: 'Batapav Coffee & Eatery',
    category: 'Aestetic',
    facilities: ['Harga Terjangkau', 'Menu Makanan Lezat', 'Outdoor', 'Indoor Area'],
    address: 'Jl. Citayam, RT.7/RW.1, Rw. Bar., Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12180',
    imageUrl: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-006',
    name: 'KS Coffee & Roastery',
    category: 'WFC',
    facilities: ['Free WI-FI', 'Outdoor', 'Indoor Area', 'Parkir Gratis'],
    address: 'Jln.sultan Jl. Sri Sultan Hamengkubuwono IX No.km.23, RT.3/RW.5, Cakung Tim., Kec. Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13910',
    imageUrl: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-007',
    name: 'Clay Coffee Space',
    category: 'Aestetic',
    facilities: ['Outdoor', 'Indoor Area', 'Disabilitas Friendly', 'Parkir Luas'],
    address: 'Jl. Jatinegara Kaum No.17, RT.1/RW.3, Jatinegara Kaum, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13260',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-008',
    name: 'Kaizen Heritage 3.0 / Kaizen Matraman',
    category: 'Aestetic',
    facilities: ['Free WI-FI', 'Terima Reservasi', 'Parkir Luas'],
    address: 'Jl. Matraman Raya, RT.2/RW.3, Palmeriam, Kec. Matraman, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13310',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-009',
    name: 'Tis My Cafe',
    category: 'WFC',
    facilities: ['Free Wi-FI', 'Parkir Gratis', 'Menerima Reservasi'],
    address: 'Jl. Melawai Raya No.116 F, RT.1/RW.6, Melawai, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12130',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-010',
    name: 'Coquette & Cream',
    category: 'Aestetic',
    facilities: ['Parkir Luas', 'Outdoor', 'Indoor Area', 'Banyak Spot Foto'],
    address: 'Jl. Taman Alfa Indah No.44 Blok F1, RT.7/RW.5, Joglo, Kembangan, West Jakarta City, Jakarta 11640',
    imageUrl: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-011',
    name: 'Ribbon Coffee & Eatery',
    category: 'Aestetic',
    facilities: ['Disabilitas Friendly', 'Menerima Reservasi', 'Parkir Luas'],
    address: 'Jl. Tebet Bar. No.18, RT.10/RW.5, Tebet Bar., Kec. Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12810',
    imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-012',
    name: 'PA.NA.MA Coffee & Eatery',
    category: 'Coffee Shop',
    facilities: ['Layanan Pesan di Meja', 'Terima Reservasi', 'Parkir Luas dan Gratis'],
    address: 'Ruko Hive Uptown A28, Cibatu, Lippo Cikarang, Kabupaten Bekasi, Jawa Barat 17530',
    imageUrl: 'https://images.unsplash.com/photo-1463797221720-6b07e6426c24?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-013',
    name: 'Djauw Coffee, PETAK 9 - GLODOK',
    category: 'Coffee Shop',
    facilities: ['Layanan Pesan di Meja', 'Indoor', 'Outdoor Area'],
    address: 'Jl. Kemenangan Raya No.58B, RT.6/RW.6, Glodok, Kec. Taman Sari, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11120',
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-014',
    name: 'Concrete 11th Space Kedoya',
    category: 'WFC',
    facilities: ['Terdapat Ruang Meeting', 'Free Wi-FI', 'Free Refill Air'],
    address: 'Jl. Pilar Mas Utama, RT.7/RW.3, Kedoya Sel., Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11610',
    imageUrl: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAFE-015',
    name: 'Dessert Darlings, M. Kahfi 2',
    category: 'Aestetic',
    facilities: ['Free WI-FI', 'Terima Reservasi', 'Parkir Luas'],
    address: 'Jl. Moch. Kahfi II No.42, RT.2/RW.1, Jagakarsa, Kec. Jagakarsa, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12620',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80'
  }
];

export const SEED_REVIEWS: Review[] = [
  {
    id: 'REV-001',
    cafeId: 'CAFE-001',
    username: 'coffeelover',
    rating: 5,
    comment: 'Tempatnya luas banget, outdoor areanya asik buat nongkrong sore-sore. Kopinya mantap khas Nako!',
    createdAt: '2026-06-25T14:30:00.000Z'
  },
  {
    id: 'REV-002',
    cafeId: 'CAFE-001',
    username: 'wfh_warrior',
    rating: 4,
    comment: 'Wi-Fi lumayan cepat, colokan juga banyak di area semi-outdoor. Pas buat kerja ringan.',
    createdAt: '2026-06-26T10:15:00.000Z'
  },
  {
    id: 'REV-003',
    cafeId: 'CAFE-003',
    username: 'programmer_jakarta',
    rating: 5,
    comment: 'Tempat andalan buat WFC 24 jam! Ramah banget buat yang suka coding malam. Tempat tenang dan stop kontak melimpah.',
    createdAt: '2026-06-27T02:45:00.000Z'
  },
  {
    id: 'REV-004',
    cafeId: 'CAFE-007',
    username: 'aesthetic_girl',
    rating: 5,
    comment: 'Instagramable parah! Sudut-sudutnya cantik banget buat foto OOTD. Kopi susunya juga enak manisnya pas.',
    createdAt: '2026-06-27T16:20:00.000Z'
  },
  {
    id: 'REV-005',
    cafeId: 'CAFE-014',
    username: 'meeting_room_user',
    rating: 4,
    comment: 'Cocok banget buat meeting santai. Ada meeting room yang kedap, free-flow air mineral, dan internetnya kenceng pol.',
    createdAt: '2026-06-28T01:05:00.000Z'
  }
];
