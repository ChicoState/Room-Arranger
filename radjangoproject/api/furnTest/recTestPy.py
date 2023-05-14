
import webbrowser


class furn:
  def __init__(self, name, category, price, description, width, height, length, link, image):
    self.name = name
    self.category = category
    self.price = price
    self.description = description
    self.width = width
    self.height = height
    self.length = length
    self.link = link
    self.image = image

def rec(furniture_data):
    dat = {
        furn("MALM","Queen Bed",399,"High bed frame/2 storage boxes, black-brown/Luroy, Queen",66.125,39.375,83.125,"https://www.ikea.com/us/en/p/malm-high-bed-frame-2-storage-boxes-black-brown-luroey-s69176285/","https://www.ikea.com/us/en/images/products/malm-high-bed-frame-2-storage-boxes-black-brown-luroey__1154412_pe886059_s5.jpg?f=s"),
        furn("TARVA","Queen Bed",199,"Bed frame, pine/Luroy, Queen",63,36.25,82.25,"https://www.ikea.com/us/en/p/tarva-bed-frame-pine-luroey-s29007794/","https://www.ikea.com/us/en/images/products/tarva-bed-frame-pine-luroey__0637611_pe698421_s5.jpg?f=xl"),
        furn("SAGGSTUA","Queen Bed",249,"Bed frame, black/Luroy, Queen",63.375,55.125,82.625,"https://www.ikea.com/us/en/p/sagstua-bed-frame-black-luroey-s29268871/","https://www.ikea.com/us/en/images/products/sagstua-bed-frame-black-luroey__0662135_pe719104_s5.jpg?f=xl"),
        furn("OSTANO","Armchair 1",35,"Chair, red-brown Remmarn/red-brown",17.75,29.875,17.75,"https://www.ikea.com/us/en/p/oestanoe-chair-red-brown-remmarn-red-brown-90538647/","https://www.ikea.com/us/en/images/products/oestanoe-chair-red-brown-remmarn-red-brown__1120081_pe873713_s5.jpg?f=xl"),
        furn("EKENASET","Armchair 1",249,"Armchair, Kilanda light beige",25.25,29.875,30.75,"https://www.ikea.com/us/en/p/ekenaeset-armchair-kilanda-light-beige-30533493/","https://www.ikea.com/us/en/images/products/ekenaeset-armchair-kilanda-light-beige__1109687_pe870153_s5.jpg?f=xl"),
        furn("LOBERGET/SIBBEN","Armchair 1",39.99,"Child's desk chair, white",22,29.5,22,"https://www.ikea.com/us/en/p/loberget-sibben-childs-desk-chair-white-s59337670/","https://www.ikea.com/us/en/images/products/loberget-sibben-childs-desk-chair-white__0826517_pe776395_s5.jpg?f=xl"),
        furn("VOXLOV","Armchair 1",125,"Chair, light bamboo",16.875,33.5,20.875,"https://www.ikea.com/us/en/p/voxloev-chair-light-bamboo-50450236/","https://www.ikea.com/us/en/images/products/voxloev-chair-light-bamboo__0948161_pe798889_s5.jpg?f=xl"),
        furn("LINNMON/ADILS","Desk",54.99,"Table, white",23.675,28.75,39.375,"https://www.ikea.com/us/en/p/linnmon-adils-table-white-s29932181/","https://www.ikea.com/us/en/images/products/linnmon-adils-table-white__0737165_pe740925_s5.jpg?f=xl"),
        furn("IDANAS","Desk",199.99,"Drop-leaf table, white,",37.75,29.5,33.875,"https://www.ikea.com/us/en/p/idanaes-drop-leaf-table-white-00487652/","https://www.ikea.com/us/en/images/products/idanaes-drop-leaf-table-white__0926738_pe789490_s5.jpg?f=xl"),
        furn("LAGKAPTEN / ALEX", "Desk", 279.99, "Desk, white, 55 1/8x23 5/8", 23.625, 28.75, 55.125, "https://www.ikea.com/us/en/p/lagkapten-alex-desk-white-s99431982/", "https://www.ikea.com/us/en/images/products/lagkapten-alex-desk-white__1022432_pe832720_s5.jpg?f=xxs"),
        furn("LACK","Coffee Table",44.99,"Coffee table, black-brown",21.625,17.75,35.375,"https://www.ikea.com/us/en/p/lack-coffee-table-black-brown-40104294/","https://www.ikea.com/us/en/images/products/lack-coffee-table-black-brown__57540_pe163122_s5.jpg?f=xl"),
        furn("LUNNARP", "Coffee Table", 79.99, "Coffee table, brown, 35 3/8x21 5/8", 38.375, 19.375, 21.625,"https://www.ikea.com/us/en/p/lunnarp-coffee-table-brown-20399027/", "https://www.ikea.com/us/en/images/products/lunnarp-coffee-table-brown__0593613_pe675310_s5.jpg?f=xxs"), 
        furn("BORGEBY", "Coffee Table", 149.99, "Coffee table, birch veneer, 27 1/2",27.5, 16.5, 27.5, "https://www.ikea.com/us/en/p/borgeby-coffee-table-birch-veneer-70389356/", "https://www.ikea.com/us/en/images/products/borgeby-coffee-table-birch-veneer__0987623_pe817609_s5.jpg?f=xxs"),
        furn("MICKE", "Hutch Desk", 269.99, "Corner workstation, white, 39 3/8x55 7/8", 39.375, 55.875, 38.375, "https://www.ikea.com/us/en/p/micke-corner-workstation-white-50250713/", "https://www.ikea.com/us/en/images/products/micke-corner-workstation-white__0734328_pe739442_s5.jpg?f=xxs"),
        furn("FREDDE", "Hutch Desk", 369.99, "Gaming desk, black, 55 1/8/72 7/8x29 1/8x57 1/2", 72.875, 57.5, 29.125, "https://www.ikea.com/us/en/p/fredde-gaming-desk-black-50219044/", "https://www.ikea.com/us/en/images/products/fredde-gaming-desk-black__0736008_pe740351_s5.jpg?f=xxs"),
        furn("BOAXEL / LAGKAPTEN", "Hutch Desk", 159.99, "Shelving unit with table top, white, 49 1/8x24 3/8x79", 49.125, 79, 24.375, "https://www.ikea.com/us/en/p/boaxel-lagkapten-shelving-unit-with-table-top-white-s89440562/", "https://www.ikea.com/us/en/images/products/boaxel-lagkapten-shelving-unit-with-table-top-white__1040514_pe840674_s5.jpg?f=xxs"),
        furn("KNARREVIK", "Nightstand", 15.99, "Nightstand, black, 14 5/8x11", 14.625, 17.75, 11, "https://www.ikea.com/us/en/p/knarrevik-nightstand-black-30381183/", "https://www.ikea.com/us/en/images/products/knarrevik-nightstand-black__0578634_pe669464_s5.jpg?f=xxs"),
        furn("NORDKISA", "Nightstand", 99.99, "Nightstand, bamboo, 15 3/4x15 3/4", 15.75, 26.625, 15.75, "https://www.ikea.com/us/en/p/nordkisa-nightstand-bamboo-60447677/", "https://www.ikea.com/us/en/images/products/nordkisa-nightstand-bamboo__0756025_pe748745_s5.jpg?f=xxs"),
        furn("BURVIK", "Nightstand", 52.99, "Side table, white, 15", 15, 30.75, 15, "https://www.netflix.com/watch/80028643?trackId=14170286&tctx=1%2C0%2C400198f4-1209-4f64-8932-c3474c38c6ca-433025501%2CNES_C3ACA1B2097EDD80608C91E2FE6E2A-B9F225DDE3A711-8B6743FCB7_p_1684037467148%2CNES_C3ACA1B2097EDD80608C91E2FE6E2A_p_1684037467148%2C%2C%2C%2C%2CVideo%3A70184207%2CminiDpPlayButton", "https://www.ikea.com/us/en/images/products/burvik-side-table-white__0551240_pe658473_s5.jpg?f=xxs"),
        furn("SONGESAND", "Twin Bed", 309, "Bed frame with 2 storage boxes, brown, Twin", 47.875, 77.125, 37.375, "https://www.ikea.com/us/en/p/songesand-bed-frame-with-2-storage-boxes-brown-s99240987/", "https://www.ikea.com/us/en/images/products/songesand-bed-frame-with-2-storage-boxes-brown__1151059_pe884759_s5.jpg?f=xxs"),
        furn("NEIDEN", "Twin Bed", 49, "Bed frame, pine, Twin", 39.75, 25.625, 76.75, "https://www.ikea.com/us/en/p/neiden-bed-frame-pine-00395252/", "https://www.ikea.com/us/en/images/products/neiden-bed-frame-pine__0749132_pe745501_s5.jpg?f=xxs"),
        furn("SAGSTUA", "Twin Bed", 199, "Bed frame, white/Luröy, Twin", 41.375, 78, 47.25, "https://www.ikea.com/us/en/p/sagstua-bed-frame-white-luroey-s99259627/", "https://www.ikea.com/us/en/images/products/sagstua-bed-frame-white-luroey__0662174_pe719101_s5.jpg?f=xxs"),
        furn("HEMNES", "Dresser", 399.99, "8-drawer dresser, white stain, 63x37 3/4 ", 63, 37.75, 19.625, "https://www.ikea.com/us/en/p/hemnes-8-drawer-dresser-white-stain-00318598/", "https://www.ikea.com/us/en/images/products/hemnes-8-drawer-dresser-white-stain__0627346_pe693299_s5.jpg?f=xxs"),
        furn("HAUGA", "Dresser", 279.99, "6-drawer dresser, white, 54 3/8x33 1/8", 54.375, 33.125, 18.125, "https://www.ikea.com/us/en/p/hauga-6-drawer-dresser-white-00407306/", "https://www.ikea.com/us/en/images/products/hauga-6-drawer-dresser-white__0898785_pe782651_s5.jpg?f=xxs"),
        furn("BRIMNES", "Dresser", 219.99, "4-drawer dresser, white/frosted glass,", 30.75, 48.875, 18.125, "https://www.ikea.com/us/en/p/brimnes-4-drawer-dresser-white-frosted-glass-70473128/", "https://www.ikea.com/us/en/images/products/brimnes-4-drawer-dresser-white-frosted-glass__0651663_pe707005_s5.jpg?f=xxs"), 
        furn("TIPHEDE", "Carpet 2", 14.99, "Rug, flatwoven, natural/black, 3 ' 11 x5 ' 11", 47, 0, 71, "https://www.ikea.com/us/en/p/tiphede-rug-flatwoven-natural-black-40456757/", "https://www.ikea.com/us/en/images/products/tiphede-rug-flatwoven-natural-black__0772066_pe755879_s5.jpg?f=xxs"),
        furn("VEDBAK", "Carpet 2", 179.99, "Rug, low pile, light gray,", 79, 0, 118, "https://www.ikea.com/us/en/p/vedbaek-rug-low-pile-light-gray-80528903/", "https://www.ikea.com/us/en/images/products/vedbaek-rug-low-pile-light-gray__1072491_pe855183_s5.jpg?f=xxs"),
        furn("TOFTLUND", "Carpet 2", 14.99, "Rug, white", 22, 0, 33, "https://www.ikea.com/us/en/p/toftlund-rug-white-20420241/", "https://www.ikea.com/us/en/images/products/toftlund-rug-white__0617682_pe688130_s5.jpg?f=xxs"),
        furn("LINANAS","Sofa 1",499,"Sofa, with chaise/Vissle dark gray",77.5,57.125,29.875,"https://www.ikea.com/us/en/p/linanaes-sofa-with-chaise-vissle-dark-gray-70512243/","https://www.ikea.com/us/en/images/products/linanaes-sofa-with-chaise-vissle-dark-gray__1013908_pe829460_s5.jpg?f=xl"),
        furn("GOLSTAD","Sofa 1",149,"Loveseat, Knisa dark gray",47.625,26.75,30.75,"https://www.ikea.com/us/en/p/glostad-loveseat-knisa-dark-gray-70489011/","https://www.ikea.com/us/en/images/products/glostad-loveseat-knisa-dark-gray__0950864_pe800736_s5.jpg?f=xl"),
        furn("SODERHAMN","Sofa 1",400,"Corner section, Viarp beige/brown",39,32.625,39,"https://www.ikea.com/us/en/p/soederhamn-corner-section-viarp-beige-brown-s99305629/","https://www.ikea.com/us/en/images/products/soederhamn-corner-section-viarp-beige-brown__0802789_pe768594_s5.jpg?f=xl"),
        furn("LINANAS","Sofa 2",499,"Sofa, with chaise/Vissle dark gray" ,77.5, 57.125, 29.875,"https://www.ikea.com/us/en/p/linanaes-sofa-with-chaise-vissle-dark-gray-70512243/","https://www.ikea.com/us/en/images/products/linanaes-sofa-with-chaise-vissle-dark-gray__1013908_pe829460_s5.jpg?f=xl"),
        furn("GOLSTAD","Sofa 2",149,"Loveseat, Knisa dark gray",47.625,26.75,30.75,"https://www.ikea.com/us/en/p/glostad-loveseat-knisa-dark-gray-70489011/","https://www.ikea.com/us/en/images/products/glostad-loveseat-knisa-dark-gray__0950864_pe800736_s5.jpg?f=xl"),
        furn("SODERHAMN","Sofa 2",400,"Corner section, Viarp beige/brown",39,32.625,39,"https://www.ikea.com/us/en/p/soederhamn-corner-section-viarp-beige-brown-s99305629/","https://www.ikea.com/us/en/images/products/soederhamn-corner-section-viarp-beige-brown__0802789_pe768594_s5.jpg?f=xl"),
        furn("KIVIK", "Ottoman", 249, "Ottoman with storage, Tibbleby beige/gray", 35.375, 16.675, 27.5, "https://www.ikea.com/us/en/p/kivik-ottoman-with-storage-tibbleby-beige-gray-s89440500/", "https://www.ikea.com/us/en/images/products/kivik-ottoman-with-storage-tibbleby-beige-gray__1056133_pe848264_s5.jpg?f=xxs"),
        furn("GRUNDSJO", "Ottoman", 189.99, "Ottoman, Gunnared dark gray", 23.25, 18.5, 23.25, "https://www.ikea.com/us/en/p/grundsjoe-ottoman-gunnared-dark-gray-80505082/", "https://www.ikea.com/us/en/images/products/grundsjoe-ottoman-gunnared-dark-gray__0997549_pe822704_s5.jpg?f=xxs"),
        furn("KALLAX", "TV Stand", 94.99, "Shelving unit with underframe, white/white,", 57.675, 23.25, 15.375, "https://www.ikea.com/us/en/p/kallax-shelving-unit-with-underframe-white-white-s59442666/", "https://www.ikea.com/us/en/images/products/kallax-shelving-unit-with-underframe-white-white__1041442_pe841030_s5.jpg?f=xxs"),
        furn("BESTA", "TV Stand", 140, "TV unit, black-brown,", 47.25, 18.825, 15.75, "https://www.ikea.com/us/en/p/besta-tv-unit-black-brown-s49061228/", "https://www.ikea.com/us/en/images/products/besta-tv-unit-black-brown__0341771_pe531784_s5.jpg?f=xxs")
    }
    
    ret = []

    c = furniture_data['category']

    for e in dat:
        if e.category == c:
            ret.append(e)
            #webbrowser.open(e.link, new = 2)

    err = 100
    
    final = furn(0, 0, 0, 0, 0, 0, 0, 0, 0)

    for x in ret:
        ferr = (abs(furniture_data['width']-x.width)+abs(furniture_data['height']-x.length))/2
        if ferr < err:
            err = ferr
            final = x
    r = { 
            "name":final.name, 
            "category":final.category, 
            "price":final.price, 
            "description":final.description, 
            "width":final.width, 
            "height":final.height, 
            "length":final.length, 
            "link":final.link, 
            "image":final.image }
    
    webbrowser.open(final.link, new = 2)

    return r

    
