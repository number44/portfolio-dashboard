interface NoteI {
	id?: number;
	name: string;
	content?: string;
	slug?: string;
	category?: string;
	category_id?: number;
}
interface CategoryI {
	id?: number;
	name: string;
}

interface PlaceTypesI {
	id?: number;
	name?: string;
	ename?: string;
	icon?: string;
}

interface PlaceI {
	id?: number;
	name?: string;
	ename?: string;
	lat?: number;
	lon?: number;
	placetype?: string;
	placetype_id?: number;
}

interface CoordinatesI {
	lat: number | string;
	lon: number | string;
}
interface SearchResI extends SearchI {
	place_id?: number;
	lat?: string;
	lon?: string;
	display_name?: string;
	type?: string;
}

interface SearchI {
	search: string;
}
interface LocationI {
	id?: number;
	name: string;
	ename: string;
	lat: number;
	lon: number;
	thumbnail?: string;
	district: string;
}

interface PpropertyI {
	estate_id: string;
	label: string;
	room: ProomI[];
}
interface ProomI {
	room_id: string;
	title: string;
	price: PpriceI;
	availability: PavailabilityI;
}
interface PpriceI {
	per_month: string;
}
interface PavailabilityI {
	start_date: string;
}

interface RoomtypeI {
	id: number;
	name: string;
	ename: string;
}

interface DoubleI {
	locations: LocationI[];

	roomtype: RoomtypeI[];
}
interface UploadEditorStateI {
	uploadEditor: () => void;
	clean: () => void;
}

/**
 * accomodation: "5"
address: {street: 'Świętego Jerzego 5/7 m 9', city: 'Łódź', country: 'Polska'}
availability: {min_duration: '30', start_date: '2022-01-07'}
created_at: "2017-12-21"
description: "<p>Mieszkanie bez właściciela przy ulicy Jerzego 5/7. <b>Świetna lokalizacja w pobliżu Manufaktury! </b></p><p>Mieszkanie zostało specjalnie wyremontowane i przystosowane do potrzeb naszych najemców. Przeznaczone jest dla studentów i młodych osób pracujących.\r\n\r\nW mieszkaniu do dyspozycji mieszkańców jest bezpłatny Internet WiFi.\r\n</p><p>\r\nMieszkanie składa się z 5 pokoi . </p><p>Jest w pełni wyposażone we wszystkie sprzęty potrzebne do życia i mieszkania. Do dyspozycji są:\r\n\r\n    żelazko,\r\n    czajnik,\r\n    suszarka do ubrań,\r\n    deska do prasowania,\r\n    odkurzacz,\r\n    mop i zmiotka. \r\n\r\nWszystkie części wspólne na wszystkich piętrach są całodobowo monitorowane i znajduje się pod naszą opieką przez cały okres najmu. </p><br><p><b>Pokój 1-osobowy</b>.<br></p><p>Wyposażony jest w:<br></p><ul><li>łóżko jednoosobowe o rozmiarach 90 x 200,</li><li>szafę,</li><li>biurko,</li><li>krzesło,</li><li>komodę.</li></ul><p>Pokój jest ogrzewany z sieci miejskiej. Ogrzewanie bez limitu w cenie pokoju. W oknach znajdują się rolety w kasecie.</p><p><b>Uwaga:</b> Dla komfortu i prywatności najemcy pokój jest zamykany na klucz!</p><br><p>W kuchni znajduje się sprzęt AGD:</p><ul><li>lodówko-zamrażarka;&nbsp;</li><li>płyta elektryczna,&nbsp;</li><li>kuchenka mikrofalowa,</li><li>czajnik elektryczny bezprzewodowy</li></ul><p></p><p>jak również dla komfortu osób wynajmujących pełne wyposażenie kuchni:</p><ul><li>talerze</li><li>sztućce</li><li>szklanki</li><li>kubki</li><li>komplet garnków i patelni,</li><li>deski do krojenia,</li><li>cedzak,</li><li>solniczka i pieprzniczka,&nbsp;</li><li>łopatki itp.</li></ul><br><p>Mieszkanie jest wyposażone w łazienkę zawierającą </p><ul><li>1 WC </li><li> \r\n1 umywalkę z szafką i lustrem\r\n</li><li>1 prysznic</li><li>1 pralkę</li></ul><p>Oprócz tego wieszaki na ręczniki, koszyczki na kosmetyki.<br></p>"
images: {image: Array(13)}
landlord_policies: "<ul><li>Umowa na wynajem pokoju zawierana jest w formie pisemnej.&nbsp;</li><li>Preferowany okres najmu to rok.</li><li>Koszt mediów to 200 zł miesięcznie w przypadku pokojów jednoosobowych i dwuosobowych zamieszkałych pojedynczo. W przypadku pokojów dwuosobowych zamieszkanych przez dwie osoby koszt mediów to 300 zł.&nbsp;W cenę mediów wliczamy ciepłą i zimną wodę, prąd, gaz, wywóz śmieci, odprowadzenie nieczystości, koszty administracyjne oraz nielimitowany dostęp do bezprzewodowego internetu.</li><li>Przy podpisaniu umowy wymagana kaucja zwrotna 1 000 zł.Przy wynajmie na 6 m-cy i krótszym kaucja 1500.Kaucja 1500 dla pokoi dwuosobowych.<br></li></ul>"
price: {per_month: '650.00', currency: 'PLN'}
property_type: "Private room"
room_id: "12"
title: "Pokój 1-osobowy  nr 3"
updated_at: "2020-01-11"
 */
/**
 * 
 * from os import name
from django.db import models
from django.db.models.base import Model

class PlaceType(models.Model):
    name = models.CharField(max_length=20)
    en_name = models.CharField(max_length=80 , null=True)
    icon = models.FileField(upload_to='icons/')
    def __str__(self):
        return str(self.name)

class Place(models.Model):
    name = models.CharField(max_length=100)
    en_name = models.CharField(max_length=80 , null=True)
    lon = models.DecimalField(max_digits=8, decimal_places=6)
    lat = models.DecimalField(max_digits=8, decimal_places=6)
    placetype = models.ForeignKey(PlaceType, related_name='places', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

### Nowe 
Districts = (
    ("1","Bałuty"),
    ("2","Górna"),
    ("3","Polesie"),
    ("4","Śródmieście"),
    ("5","Widzew")
)

class Location(models.Model):
    name = models.CharField(max_length=80)
    en_name = models.CharField(max_length=80 , null=True)
    lat = models.DecimalField(max_digits=8, decimal_places=6)
    lon = models.DecimalField(max_digits=8, decimal_places=6)
    thumbnail = models.ImageField(upload_to='location_thumbnails')
    district = models.CharField(max_length=30,choices=Districts, default='1')
    
    def __str__(self):
        return self.name

class LEquipment(models.Model):
    estate = models.OneToOneField(Location,primary_key=True,on_delete=models.CASCADE)
    internet = models.BooleanField(default=True)
    tv = models.BooleanField(default=True)
    microwave = models.BooleanField(default=True)
    washing_machine = models.BooleanField(default=True)
    dryer = models.BooleanField(default=True)
    parking = models.BooleanField(default=True)
    elevator = models.BooleanField(default=True)
    oven = models.BooleanField(default=True)
    equipped_kitchen = models.BooleanField(default=True)
    def __str__(self):
        return 'Equipment'
        
class Limage(models.Model):
    name = models.CharField(max_length=50)
    en_name = models.CharField(max_length=50)
    img_url = models.ImageField(upload_to='limages/')
    location = models.ForeignKey(Location, related_name='images',on_delete=models.CASCADE)

    def __str__(self):
        return self.name
EstateTypes = (
    ("1","Pokój jednoosobowy"),
    ("2","Pokój dwuosobowy"),
    ("3","studio"),
    ("4","Mieszkanie"),
)
    

class Estate(models.Model):
    sonid = models.IntegerField(null=True)
    location = models.ForeignKey(Location,related_name='estates',on_delete=models.CASCADE)
    name = models.CharField(max_length=50,default='')
    en_name = models.CharField(max_length=50,default='') 
    bed = models.IntegerField(default=1)
    check_in = models.DateField(null=True)
    check_out = models.DateField(null=True)
    price = models.IntegerField(null=True)
    deposit = models.IntegerField(null=True)
    thumbnail = models.ImageField(upload_to='estate_thumbnails' , default='https://images.pexels.com/photos/584399/living-room-couch-interior-room-584399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
    estate_types = models.CharField(max_length=30,choices=EstateTypes, default='1')
    def __str__(self):
        return self.name

class Image(models.Model):
    name = models.CharField(max_length=50)
    en_name = models.CharField(max_length=50)
    img_url = models.ImageField(upload_to='images/')
    estate = models.ForeignKey(Estate, related_name='images',on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

### coś się kończy
# 
### coś się zaczyna

class Equipment(models.Model):
    estate = models.OneToOneField(Estate, related_name='equipments',primary_key=True,on_delete=models.CASCADE)
    internet = models.BooleanField(default=True)
    tv = models.BooleanField(default=True)
    microwave = models.BooleanField(default=True)
    washing_machine = models.BooleanField(default=True)
    dryer = models.BooleanField(default=True)
    parking = models.BooleanField(default=True)
    elevator = models.BooleanField(default=True)
    oven = models.BooleanField(default=True)
    equipped_kitchen = models.BooleanField(default=True)
    def __str__(self):
        return 'Equipment'


class Description(models.Model):
    estate = models.OneToOneField(Estate,primary_key=True,on_delete=models.CASCADE)
    description = models.TextField(default='Opis',null=True)
    endescription = models.TextField(default='Opis Eng', null=True)
    def __str__(self) -> str:
        return 'Description'
##MSVU
#  
### Mirów, Babolica złoty potok
### 120km
class Info(models.Model):
    name = models.CharField(max_length=80, default="")
    estate = models.OneToOneField(Estate,primary_key=True,on_delete=models.CASCADE)
    beds = models.IntegerField(default=1)
    min_days = models.IntegerField(default=30)
    def __str__(self):
        return self.name

##MSVU 
### ROOM
class Room(models.Model):
    name = models.CharField(max_length=80, default="")
    
    def __str__(self):
        return self.name
    

#   rentaroom-315007:europe-central2:mysqldb
#   ./cloud_sql_proxy -instances="rentaroom-315007:europe-central2:mysqldb"=tcp:3306
 * 
 */
