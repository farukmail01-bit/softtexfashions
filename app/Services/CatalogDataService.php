<?php

namespace App\Services;

use App\Models\Gallery;

class CatalogDataService
{
    /**
     * Returns curated, production-ready product gallery catalog definitions
     * 100% visually verified against actual garment physical photography.
     */
    public static function getCatalogSeeds(): array
    {
        $seeds = [];

        // 1. U.S. Polo Assn. (9 items)
        $uspolo = [
            1 => ['title' => 'Light Heather Grey Crewneck Sweatshirt with Gold Logo', 'category' => 'Sweatshirts', 'gsm' => '280 GSM', 'moq' => '1,000 Pcs'],
            2 => ['title' => 'Pastel Baby Pink Crewneck Sweatshirt with Navy Logo', 'category' => 'Sweatshirts', 'gsm' => '280 GSM', 'moq' => '1,000 Pcs'],
            3 => ['title' => 'Medium Heather Grey Crewneck Sweatshirt with V-Stitch', 'category' => 'Sweatshirts', 'gsm' => '280 GSM', 'moq' => '1,000 Pcs'],
            4 => ['title' => 'Deep Navy Blue Crewneck Sweatshirt with Pink Logo', 'category' => 'Sweatshirts', 'gsm' => '290 GSM', 'moq' => '1,000 Pcs'],
            5 => ['title' => 'Royal Blue Classic Crewneck Sweatshirt with Red Logo', 'category' => 'Sweatshirts', 'gsm' => '290 GSM', 'moq' => '1,000 Pcs'],
            6 => ['title' => 'Burgundy Full-Zip Fleece Hooded Track Jacket', 'category' => 'Hoodies & Jackets', 'gsm' => '320 GSM', 'moq' => '800 Pcs'],
            7 => ['title' => 'Burgundy French Terry Sweat Shorts with Drawstring', 'category' => 'Shorts', 'gsm' => '260 GSM', 'moq' => '1,200 Pcs'],
            8 => ['title' => 'Light Heather Grey Full-Zip French Terry Hoodie', 'category' => 'Hoodies & Jackets', 'gsm' => '320 GSM', 'moq' => '800 Pcs'],
            9 => ['title' => 'Heather Grey French Terry Sweat Shorts with Drawstring', 'category' => 'Shorts', 'gsm' => '260 GSM', 'moq' => '1,200 Pcs'],
        ];
        foreach ($uspolo as $idx => $p) {
            $seeds[] = array_merge($p, [
                'client_slug' => 'us-polo',
                'image_url' => "images/uspolo/{$idx}.jpg",
                'order' => $idx,
                'is_active' => true,
            ]);
        }

        // 2. Rich Cotton (4 items)
        $richcotton = [
            1 => ['title' => 'Mint Green Solid V-Neck Combed Cotton T-Shirt', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            2 => ['title' => 'Royal Blue Classic Crewneck Combed Cotton T-Shirt', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            3 => ['title' => 'Rich Cotton USA Signature Hangtag & Single Jersey Texture', 'category' => 'Brand Trims', 'gsm' => '180 GSM', 'moq' => '2,000 Pcs'],
            4 => ['title' => 'Mint Green V-Neck 1x1 Rib Collar & Inner Label Detail', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
        ];
        foreach ($richcotton as $idx => $p) {
            $seeds[] = array_merge($p, [
                'client_slug' => 'rich-cotton',
                'image_url' => "images/richcotton/{$idx}.jpg",
                'order' => $idx,
                'is_active' => true,
            ]);
        }

        // 3. Emart (4 items)
        $emart = [
            1 => ['title' => 'Official Peanuts™ Charlie Brown Baseball Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            2 => ['title' => 'Official Peanuts™ Athletic Club Dugout Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            3 => ['title' => 'Official Peanuts™ Snoopy & Woodstock "Est. 1950" Mint Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            4 => ['title' => 'Kids Mustard Yellow "STANDARD 1989" Crewneck Fleece', 'category' => 'Sweatshirts', 'gsm' => '280 GSM', 'moq' => '1,000 Pcs'],
        ];
        foreach ($emart as $idx => $p) {
            $seeds[] = array_merge($p, [
                'client_slug' => 'emart',
                'image_url' => "images/emart/{$idx}.jpg",
                'order' => $idx,
                'is_active' => true,
            ]);
        }

        // 4. Head Sportswear (5 items)
        $head = [
            1 => ['title' => 'Head Active Pro Navy Athletic Crewneck Performance Tee', 'category' => 'Activewear', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            2 => ['title' => 'Head Light Heather Grey Performance Tee with Chest Stripe', 'category' => 'Activewear', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            3 => ['title' => 'Head Signature Swing Tag & Tech Dry-Fit Fabric Detail', 'category' => 'Activewear', 'gsm' => '160 GSM', 'moq' => '2,000 Pcs'],
            4 => ['title' => 'Head Heather Grey Crewneck Collar & Chest Stripe Detail', 'category' => 'Activewear', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            5 => ['title' => 'Head Black Minimalist Laser-Cut Athletic Tech Tee', 'category' => 'Activewear', 'gsm' => '150 GSM', 'moq' => '1,500 Pcs'],
        ];
        foreach ($head as $idx => $p) {
            $seeds[] = array_merge($p, [
                'client_slug' => 'head',
                'image_url' => "images/head/{$idx}.jpg",
                'order' => $idx,
                'is_active' => true,
            ]);
        }

        // 5. Tesco F&F (13 items)
        $tesco = [
            1 => ['title' => 'F&F Kids Mustard Yellow "STANDARD 1989" Fleece Sweatshirt', 'category' => 'Sweatshirts', 'gsm' => '280 GSM', 'moq' => '1,500 Pcs'],
            2 => ['title' => 'F&F Kids Mustard Yellow "Planet Day" Long-Sleeve Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '2,000 Pcs'],
            3 => ['title' => 'F&F Kids Black "Planet Day" Oversized Long-Sleeve Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '2,000 Pcs'],
            4 => ['title' => 'F&F Kids White "Companions" Cartoon Printed Long-Sleeve Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '2,000 Pcs'],
            5 => ['title' => 'F&F Boys Denim Blue Heather Long-Sleeve Tee with Embroidery', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,800 Pcs'],
            6 => ['title' => 'F&F Girls White & Burgundy Striped Illustrated Long Sleeve', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '2,000 Pcs'],
            7 => ['title' => 'F&F Kids Yellow "BE FULL OF ENERGY" Long-Sleeve Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '2,000 Pcs'],
            8 => ['title' => 'F&F Boys Navy & Burgundy Striped Long-Sleeve Raglan Top', 'category' => 'T-Shirts', 'gsm' => '190 GSM', 'moq' => '1,800 Pcs'],
            9 => ['title' => 'F&F Kids Heather Grey "EVER AFTER" Varsity Long-Sleeve Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '2,000 Pcs'],
            10 => ['title' => 'F&F Kids White "TALK TO YOU" Typography Long-Sleeve Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '2,000 Pcs'],
            11 => ['title' => 'F&F Boys Royal Blue "FREE FINALS" Graphic Long-Sleeve Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '2,000 Pcs'],
            12 => ['title' => 'F&F Boys Charcoal Grey Heavyweight Joggers with Yellow Stripe', 'category' => 'Pants & Bottoms', 'gsm' => '260 GSM', 'moq' => '1,500 Pcs'],
            13 => ['title' => 'F&F Boys Black Track Joggers with Yellow Racing Stripes', 'category' => 'Pants & Bottoms', 'gsm' => '260 GSM', 'moq' => '1,500 Pcs'],
        ];
        foreach ($tesco as $idx => $p) {
            $seeds[] = array_merge($p, [
                'client_slug' => 'tesco',
                'image_url' => "images/tesco/{$idx}.jpg",
                'order' => $idx,
                'is_active' => true,
            ]);
        }

        // 6. Eddie Bauer (3 items)
        $eddie = [
            1 => ['title' => 'Eddie Bauer EB TEK Full-Zip Tactical Tech Fleece Hoodie', 'category' => 'Outerwear', 'gsm' => '360 GSM', 'moq' => '800 Pcs'],
            2 => ['title' => 'Eddie Bauer EB TEK Tactical Fleece Shorts with Cargo Pockets', 'category' => 'Shorts', 'gsm' => '280 GSM', 'moq' => '1,000 Pcs'],
            3 => ['title' => 'Eddie Bauer EB TEK Drawstring & Technical Zipper Detail', 'category' => 'Outerwear', 'gsm' => '360 GSM', 'moq' => '800 Pcs'],
        ];
        foreach ($eddie as $idx => $p) {
            $seeds[] = array_merge($p, [
                'client_slug' => 'eddiebauer',
                'image_url' => "images/eddiebauer/{$idx}.jpg",
                'order' => $idx,
                'is_active' => true,
            ]);
        }

        // 7. Forever 21 (3 items)
        $forever = [
            1 => ['title' => 'Forever 21 Waffle Slub Knit Short-Sleeve Henley Tee', 'category' => 'T-Shirts', 'gsm' => '200 GSM', 'moq' => '1,500 Pcs'],
            2 => ['title' => 'Forever 21 Color-Block Yellow, White & Blue Pique Polo', 'category' => 'Polo Shirts', 'gsm' => '220 GSM', 'moq' => '1,200 Pcs'],
            3 => ['title' => 'Forever 21 Deep Navy Blue Classic Rib-Collar Cotton Polo', 'category' => 'Polo Shirts', 'gsm' => '210 GSM', 'moq' => '1,500 Pcs'],
        ];
        foreach ($forever as $idx => $p) {
            $seeds[] = array_merge($p, [
                'client_slug' => 'forever',
                'image_url' => "images/forever/{$idx}.jpg",
                'order' => $idx,
                'is_active' => true,
            ]);
        }

        // 8. Skechers (3 items)
        $skechers = [
            1 => ['title' => 'Skechers Performance "RUNNING TRACK 92" White Athletic Tee', 'category' => 'Activewear', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            2 => ['title' => 'Skechers Athletic Performance Fleece Jogger Pants', 'category' => 'Activewear', 'gsm' => '280 GSM', 'moq' => '1,200 Pcs'],
            3 => ['title' => 'Skechers "RUNNING TRACK" French Terry Athletic Shorts', 'category' => 'Activewear', 'gsm' => '240 GSM', 'moq' => '1,500 Pcs'],
        ];
        foreach ($skechers as $idx => $p) {
            $seeds[] = array_merge($p, [
                'client_slug' => 'skechers',
                'image_url' => "images/skechers/{$idx}.jpg",
                'order' => $idx,
                'is_active' => true,
            ]);
        }

        // 9. Keith Haring (3 items)
        $haring = [
            1 => ['title' => 'Keith Haring Pop-Art Dancing Dog Branded Trims Detail', 'category' => 'Brand Trims', 'gsm' => '220 GSM', 'moq' => '1,500 Pcs'],
            2 => ['title' => 'Keith Haring Pop-Art Mustard Yellow Crewneck Tee Display', 'category' => 'T-Shirts', 'gsm' => '220 GSM', 'moq' => '1,500 Pcs'],
            3 => ['title' => 'Keith Haring Pop-Art Jade Green Long-Sleeve Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '220 GSM', 'moq' => '1,500 Pcs'],
        ];
        foreach ($haring as $idx => $p) {
            $seeds[] = array_merge($p, [
                'client_slug' => 'keithhering',
                'image_url' => "images/keithhering/{$idx}.jpg",
                'order' => $idx,
                'is_active' => true,
            ]);
        }

        // 10. Mens Collection (40 items - Visually Identified)
        $mensTitles = [
            1 => ['title' => 'Solid Navy Crewneck Cotton T-Shirt', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,000 Pcs'],
            2 => ['title' => 'Mustard Yellow V-Neck Cotton T-Shirt', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,000 Pcs'],
            3 => ['title' => 'Light Heather Grey Melange V-Neck T-Shirt', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,000 Pcs'],
            4 => ['title' => 'Heather Coral Red Melange V-Neck T-Shirt', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,000 Pcs'],
            5 => ['title' => 'Slate Blue Heather Melange V-Neck T-Shirt', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,000 Pcs'],
            6 => ['title' => 'Solid Jet Black V-Neck Cotton T-Shirt', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,000 Pcs'],
            7 => ['title' => 'Royal Blue & Navy Multi-Stripe Crewneck T-Shirt', 'category' => 'T-Shirts', 'gsm' => '190 GSM', 'moq' => '1,200 Pcs'],
            8 => ['title' => 'Washed Olive Twill Cargo Bermuda Shorts', 'category' => 'Shorts', 'gsm' => '240 GSM', 'moq' => '1,500 Pcs'],
            9 => ['title' => 'Heavy Black Twill Multi-Pocket Cargo Shorts', 'category' => 'Shorts', 'gsm' => '250 GSM', 'moq' => '1,500 Pcs'],
            10 => ['title' => 'Deep Navy Blue Enzyme-Washed Cargo Shorts', 'category' => 'Shorts', 'gsm' => '240 GSM', 'moq' => '1,500 Pcs'],
            11 => ['title' => 'Khaki Sand Cotton Twill Casual Cargo Shorts', 'category' => 'Shorts', 'gsm' => '230 GSM', 'moq' => '1,500 Pcs'],
            12 => ['title' => 'Vintage Coral Red Washed Cotton Twill Shorts', 'category' => 'Shorts', 'gsm' => '240 GSM', 'moq' => '1,200 Pcs'],
            13 => ['title' => 'Royal Cobalt Blue Flat-Front Chino Shorts', 'category' => 'Shorts', 'gsm' => '220 GSM', 'moq' => '1,500 Pcs'],
            14 => ['title' => 'Woodland Camouflage Tactical Cargo Shorts', 'category' => 'Shorts', 'gsm' => '250 GSM', 'moq' => '1,500 Pcs'],
            15 => ['title' => 'Camo Cargo Bermuda Shorts with Patch Pockets', 'category' => 'Shorts', 'gsm' => '250 GSM', 'moq' => '1,500 Pcs'],
            16 => ['title' => 'DPM Disruptive Camo Print Cargo Shorts', 'category' => 'Shorts', 'gsm' => '240 GSM', 'moq' => '1,500 Pcs'],
            17 => ['title' => 'Jet Black Enzyme-Washed Relaxed Cargo Shorts', 'category' => 'Shorts', 'gsm' => '240 GSM', 'moq' => '1,500 Pcs'],
            18 => ['title' => 'Poppy Red Cargo Bermuda Shorts with Cord Belt', 'category' => 'Shorts', 'gsm' => '240 GSM', 'moq' => '1,200 Pcs'],
            19 => ['title' => 'Deep Olive Twill Bermuda Shorts with D-Ring Belt', 'category' => 'Shorts', 'gsm' => '240 GSM', 'moq' => '1,500 Pcs'],
            20 => ['title' => 'Pastel Sky Blue Lightweight Summer Chino Shorts', 'category' => 'Shorts', 'gsm' => '210 GSM', 'moq' => '1,500 Pcs'],
            21 => ['title' => 'Slate Grey Multi-Pocket Utility Cargo Shorts', 'category' => 'Shorts', 'gsm' => '250 GSM', 'moq' => '1,500 Pcs'],
            22 => ['title' => 'Charcoal Washed Twill Cargo Bermuda Shorts', 'category' => 'Shorts', 'gsm' => '240 GSM', 'moq' => '1,500 Pcs'],
            23 => ['title' => 'Washed Black Denim Bermuda Shorts', 'category' => 'Denim', 'gsm' => '11.5 OZ', 'moq' => '1,200 Pcs'],
            24 => ['title' => 'Medium Wash Distressed Denim Jogger Shorts', 'category' => 'Denim', 'gsm' => '11 OZ', 'moq' => '1,200 Pcs'],
            25 => ['title' => 'Indigo Blue Hand-Sanded Whisker Denim Shorts', 'category' => 'Denim', 'gsm' => '12 OZ', 'moq' => '1,200 Pcs'],
            26 => ['title' => 'Dark Indigo Rolled-Cuff Denim Bermuda Shorts', 'category' => 'Denim', 'gsm' => '12 OZ', 'moq' => '1,200 Pcs'],
            27 => ['title' => 'Bleach-Washed Distressed Denim Rolled Shorts', 'category' => 'Denim', 'gsm' => '10.5 OZ', 'moq' => '1,200 Pcs'],
            28 => ['title' => 'Dark Wash Ripped Denim Shorts with Fraying', 'category' => 'Denim', 'gsm' => '11.5 OZ', 'moq' => '1,200 Pcs'],
            29 => ['title' => 'Heavy Ripped Destroyed Denim Shorts with Drawstring', 'category' => 'Denim', 'gsm' => '11 OZ', 'moq' => '1,200 Pcs'],
            30 => ['title' => 'Mid-Blue Distressed Ripped Denim Shorts', 'category' => 'Denim', 'gsm' => '11.5 OZ', 'moq' => '1,200 Pcs'],
            31 => ['title' => 'Dark Indigo Hand-Abraded Ripped Denim Cut-Offs', 'category' => 'Denim', 'gsm' => '12 OZ', 'moq' => '1,200 Pcs'],
            32 => ['title' => 'Light Khaki Soft Twill Drawstring Casual Shorts', 'category' => 'Shorts', 'gsm' => '220 GSM', 'moq' => '1,500 Pcs'],
            33 => ['title' => 'Olive Drab 6-Pocket Tactical Cargo Utility Shorts', 'category' => 'Shorts', 'gsm' => '240 GSM', 'moq' => '1,500 Pcs'],
            34 => ['title' => 'Vibrant Rose Pink Washed Twill Chino Shorts', 'category' => 'Shorts', 'gsm' => '230 GSM', 'moq' => '1,200 Pcs'],
            35 => ['title' => 'Salmon Peach Pigment-Dyed Cotton Twill Shorts', 'category' => 'Shorts', 'gsm' => '230 GSM', 'moq' => '1,200 Pcs'],
            36 => ['title' => 'Western Studded-Yoke Washed Denim Work Shirt', 'category' => 'Casual Shirts', 'gsm' => '6.5 OZ', 'moq' => '1,000 Pcs'],
            37 => ['title' => 'Classic Light Indigo Chambray Long-Sleeve Shirt', 'category' => 'Casual Shirts', 'gsm' => '5.5 OZ', 'moq' => '1,200 Pcs'],
            38 => ['title' => 'Short-Sleeve Bleached Chambray Denim Work Shirt', 'category' => 'Casual Shirts', 'gsm' => '5.5 OZ', 'moq' => '1,200 Pcs'],
            39 => ['title' => 'Crimson Red to White Dip-Dyed Ombré Casual Shirt', 'category' => 'Casual Shirts', 'gsm' => '130 GSM', 'moq' => '1,000 Pcs'],
            40 => ['title' => 'Charcoal Grey Brushed Flannel Long-Sleeve Shirt', 'category' => 'Casual Shirts', 'gsm' => '210 GSM', 'moq' => '1,000 Pcs'],
            41 => ['title' => 'Grey Check Long-Sleeve Twill Casual Shirt', 'category' => 'Casual Shirts', 'gsm' => '160 GSM', 'moq' => '1,000 Pcs'],
            42 => ['title' => 'Band-Collar Indigo Chambray Casual Shirt', 'category' => 'Casual Shirts', 'gsm' => '5.5 OZ', 'moq' => '1,000 Pcs'],
            43 => ['title' => 'French Terry Athletic Sweat Shorts Colorway Pack', 'category' => 'Shorts', 'gsm' => '260 GSM', 'moq' => '1,500 Pcs'],
            44 => ['title' => 'Contrast Panel French Terry Loungewear Shorts', 'category' => 'Shorts', 'gsm' => '250 GSM', 'moq' => '1,500 Pcs'],
            45 => ['title' => 'Burgundy Heather French Terry Relaxed Sweat Shorts', 'category' => 'Shorts', 'gsm' => '260 GSM', 'moq' => '1,200 Pcs'],
            46 => ['title' => 'Olive Green Washed Twill Elastic-Waist Shorts', 'category' => 'Shorts', 'gsm' => '230 GSM', 'moq' => '1,200 Pcs'],
            47 => ['title' => 'Multi-Color Cotton Twill Drawstring Shorts Pack', 'category' => 'Shorts', 'gsm' => '240 GSM', 'moq' => '1,500 Pcs'],
            48 => ['title' => 'Graphic Sleep Tee & Printed Boardshorts Lounge Set', 'category' => 'Loungewear', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            49 => ['title' => 'Vibrant Magenta Ribbed Cotton Muscle Tank', 'category' => 'Tops & Tanks', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            50 => ['title' => 'Navy Blue Classic Crewneck Fleece Sweatshirt', 'category' => 'Sweatshirts', 'gsm' => '280 GSM', 'moq' => '1,000 Pcs'],
            51 => ['title' => 'Woodland Camouflage Print Athletic Jersey Tank', 'category' => 'Tops & Tanks', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            52 => ['title' => '"Manhattan Sunset" Photoprint Athletic Muscle Tank', 'category' => 'Tops & Tanks', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            53 => ['title' => 'Black "Los Angeles Palm" Floral Cross Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            54 => ['title' => 'White Urban Architecture Red Box Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            55 => ['title' => 'Heather Plum "Hustle" Outdoor Scenic Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            56 => ['title' => 'Blue & White Marble Clouds All-Over Print Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            57 => ['title' => 'Navy Fine-Stripe Pique Polo Shirt with Chest Pocket', 'category' => 'Polo Shirts', 'gsm' => '210 GSM', 'moq' => '1,200 Pcs'],
            58 => ['title' => 'Light Heather Grey Classic Cotton Pique Polo', 'category' => 'Polo Shirts', 'gsm' => '210 GSM', 'moq' => '1,200 Pcs'],
            59 => ['title' => 'Heather Grey Fine-Knit Polo with Tipped Rib Collar', 'category' => 'Polo Shirts', 'gsm' => '220 GSM', 'moq' => '1,200 Pcs'],
            60 => ['title' => 'Tricolor Red, White & Royal Blue Sport Block Polo', 'category' => 'Polo Shirts', 'gsm' => '220 GSM', 'moq' => '1,200 Pcs'],
            61 => ['title' => 'White & Navy Color-Block Raglan Pique Polo', 'category' => 'Polo Shirts', 'gsm' => '220 GSM', 'moq' => '1,200 Pcs'],
            62 => ['title' => 'Solid Deep Navy Short-Sleeve Pique Polo Shirt', 'category' => 'Polo Shirts', 'gsm' => '210 GSM', 'moq' => '1,200 Pcs'],
            63 => ['title' => 'Navy Blue Multi-Panel Pastel Color-Block Polo', 'category' => 'Polo Shirts', 'gsm' => '220 GSM', 'moq' => '1,200 Pcs'],
            64 => ['title' => 'Black & White Breton Yarn-Dyed Striped Polo', 'category' => 'Polo Shirts', 'gsm' => '220 GSM', 'moq' => '1,200 Pcs'],
            65 => ['title' => 'Heather Grey "Lonsdale" Sleeveless Gym Hoodie', 'category' => 'Activewear', 'gsm' => '280 GSM', 'moq' => '1,000 Pcs'],
            66 => ['title' => 'Light Heather Grey French Terry Athletic Shorts', 'category' => 'Shorts', 'gsm' => '260 GSM', 'moq' => '1,200 Pcs'],
            67 => ['title' => 'Charcoal Melange Slim-Fit French Terry Joggers', 'category' => 'Pants & Bottoms', 'gsm' => '280 GSM', 'moq' => '1,000 Pcs'],
            68 => ['title' => 'Washed Charcoal Heavyweight French Terry Joggers', 'category' => 'Pants & Bottoms', 'gsm' => '300 GSM', 'moq' => '1,000 Pcs'],
            69 => ['title' => 'Charcoal Grey Slub Cotton Textured Pique Polo', 'category' => 'Polo Shirts', 'gsm' => '210 GSM', 'moq' => '1,200 Pcs'],
            70 => ['title' => 'Ice Blue Heather Lightweight Pique Polo Shirt', 'category' => 'Polo Shirts', 'gsm' => '200 GSM', 'moq' => '1,200 Pcs'],
            71 => ['title' => 'Black Diamond-Quilted Lightweight Bomber Jacket', 'category' => 'Outerwear', 'gsm' => '320 GSM', 'moq' => '800 Pcs'],
            72 => ['title' => 'Black Horizontal-Quilt Padded Utility Puffer Vest', 'category' => 'Outerwear', 'gsm' => '300 GSM', 'moq' => '800 Pcs'],
            73 => ['title' => 'White "ORIGINAL 8" Botanical Number Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            74 => ['title' => 'Olive Woodland Camo "Gravity" Athletic Tank Top', 'category' => 'Tops & Tanks', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            75 => ['title' => 'White & Navy Engineered Shoulder-Panel Pique Polo', 'category' => 'Polo Shirts', 'gsm' => '220 GSM', 'moq' => '1,200 Pcs'],
            76 => ['title' => 'Rust Burgundy Short-Sleeve Cotton Poplin Shirt', 'category' => 'Casual Shirts', 'gsm' => '130 GSM', 'moq' => '1,200 Pcs'],
            77 => ['title' => 'Yarn-Dyed Narrow Striped Polo with Solid Collar', 'category' => 'Polo Shirts', 'gsm' => '220 GSM', 'moq' => '1,200 Pcs'],
            78 => ['title' => 'White & Navy Color-Block Raglan Sport Polo', 'category' => 'Polo Shirts', 'gsm' => '220 GSM', 'moq' => '1,200 Pcs'],
            79 => ['title' => 'Tropical Blue Palm Leaf All-Over Print Resort Shirt', 'category' => 'Casual Shirts', 'gsm' => '130 GSM', 'moq' => '1,000 Pcs'],
            80 => ['title' => 'Charcoal Technical Full-Zip Windbreaker Track Jacket', 'category' => 'Outerwear', 'gsm' => '240 GSM', 'moq' => '800 Pcs'],
            81 => ['title' => 'Black & Gold Varsity Number-10 Track Jacket', 'category' => 'Outerwear', 'gsm' => '300 GSM', 'moq' => '800 Pcs'],
            82 => ['title' => 'Black Rib-Cuffed French Terry Jogger Sweatpants', 'category' => 'Pants & Bottoms', 'gsm' => '280 GSM', 'moq' => '1,000 Pcs'],
            83 => ['title' => 'Slazenger Heather Charcoal Fleece Sweatpants', 'category' => 'Pants & Bottoms', 'gsm' => '280 GSM', 'moq' => '1,200 Pcs'],
            84 => ['title' => 'Indigo Washed Denim Joggers with Elastic Drawstring', 'category' => 'Denim', 'gsm' => '11 OZ', 'moq' => '1,200 Pcs'],
            85 => ['title' => 'Mustard Yellow "Timeout California" Pullover Hoodie', 'category' => 'Sweatshirts', 'gsm' => '320 GSM', 'moq' => '800 Pcs'],
            86 => ['title' => 'Black & Yellow Contrast-Panel Zip Fleece Jacket', 'category' => 'Outerwear', 'gsm' => '300 GSM', 'moq' => '800 Pcs'],
            87 => ['title' => 'Solid Jet Black Heavyweight Crewneck Sweatshirt', 'category' => 'Sweatshirts', 'gsm' => '300 GSM', 'moq' => '1,000 Pcs'],
            88 => ['title' => 'Navy Textured Birdseye Knit Long-Sleeve Polo', 'category' => 'Knitwear', 'gsm' => '260 GSM', 'moq' => '1,000 Pcs'],
            89 => ['title' => 'Royal Blue Performance Track Pants with Side Stripe', 'category' => 'Activewear', 'gsm' => '240 GSM', 'moq' => '1,200 Pcs'],
            90 => ['title' => 'Navy Blue Minimalist Athletic Training Joggers', 'category' => 'Activewear', 'gsm' => '260 GSM', 'moq' => '1,200 Pcs'],
            91 => ['title' => 'Black Full-Zip Heavy Fleece Hoodie with Chest Badge', 'category' => 'Sweatshirts', 'gsm' => '320 GSM', 'moq' => '800 Pcs'],
            92 => ['title' => 'Navy Blue Pullover Hoodie with Striped Rib Tipping', 'category' => 'Sweatshirts', 'gsm' => '300 GSM', 'moq' => '800 Pcs'],
            93 => ['title' => 'Navy Pullover Fleece Hoodie with Retro Hem Stripes', 'category' => 'Sweatshirts', 'gsm' => '300 GSM', 'moq' => '800 Pcs'],
            94 => ['title' => 'Breton Striped Lace-Up Placket Nautical Tee', 'category' => 'T-Shirts', 'gsm' => '200 GSM', 'moq' => '1,200 Pcs'],
            95 => ['title' => 'Kappa Black Logo-Tape Full-Zip Fleece Hoodie', 'category' => 'Outerwear', 'gsm' => '320 GSM', 'moq' => '800 Pcs'],
            96 => ['title' => 'Oatmeal Nep Slub Waffle-Knit Long-Sleeve Top', 'category' => 'T-Shirts', 'gsm' => '220 GSM', 'moq' => '1,200 Pcs'],
            97 => ['title' => 'Heather Grey Pocket Crewneck Tee with Contrast Binding', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            98 => ['title' => 'Cardinal Red Pique Polo Shirt with Buttoned Pocket', 'category' => 'Polo Shirts', 'gsm' => '210 GSM', 'moq' => '1,200 Pcs'],
            99 => ['title' => 'Charcoal "SUPERIOR BRAND" Vintage Graphic Sweatshirt', 'category' => 'Sweatshirts', 'gsm' => '280 GSM', 'moq' => '1,000 Pcs'],
            100 => ['title' => 'Charcoal Melange Full-Zip French Terry Hoodie', 'category' => 'Sweatshirts', 'gsm' => '320 GSM', 'moq' => '800 Pcs'],
            101 => ['title' => 'Black Hooded Ultra-Light Down-Alternative Puffer', 'category' => 'Outerwear', 'gsm' => '340 GSM', 'moq' => '600 Pcs'],
            102 => ['title' => 'Black Multi-Pocket Quilted Tactical Field Jacket', 'category' => 'Outerwear', 'gsm' => '360 GSM', 'moq' => '600 Pcs'],
            103 => ['title' => 'Black Channel-Quilted Stand-Collar Puffer Jacket', 'category' => 'Outerwear', 'gsm' => '320 GSM', 'moq' => '600 Pcs'],
            104 => ['title' => 'Navy Blue Diamond-Quilted Zip Lightweight Jacket', 'category' => 'Outerwear', 'gsm' => '320 GSM', 'moq' => '600 Pcs'],
            105 => ['title' => 'Burgundy Wine Channel-Quilted Padded Puffer Vest', 'category' => 'Outerwear', 'gsm' => '300 GSM', 'moq' => '800 Pcs'],
            106 => ['title' => 'Black Multi-Pocket Technical Padded Utility Vest', 'category' => 'Outerwear', 'gsm' => '300 GSM', 'moq' => '800 Pcs'],
            107 => ['title' => 'Navy & Rust Windowpane Brushed Flannel Workshirt', 'category' => 'Casual Shirts', 'gsm' => '220 GSM', 'moq' => '1,000 Pcs'],
            108 => ['title' => 'Olive Heavy Cotton Twill Cargo Utility Shorts', 'category' => 'Shorts', 'gsm' => '250 GSM', 'moq' => '1,200 Pcs'],
            109 => ['title' => 'Khaki Desert Sand Twill Cargo Shorts with Belt', 'category' => 'Shorts', 'gsm' => '250 GSM', 'moq' => '1,200 Pcs'],
            110 => ['title' => 'Sage Green Botanical Fern Print Short-Sleeve Shirt', 'category' => 'Casual Shirts', 'gsm' => '130 GSM', 'moq' => '1,200 Pcs'],
            111 => ['title' => 'Indigo Blue Palm Silhouette Camp Collar Resort Shirt', 'category' => 'Casual Shirts', 'gsm' => '130 GSM', 'moq' => '1,200 Pcs'],
            112 => ['title' => 'Monochrome Jungle Flora Long-Sleeve Poplin Shirt', 'category' => 'Casual Shirts', 'gsm' => '130 GSM', 'moq' => '1,000 Pcs'],
            113 => ['title' => 'Indigo Ethnic Ikat Pattern Long-Sleeve Casual Shirt', 'category' => 'Casual Shirts', 'gsm' => '140 GSM', 'moq' => '1,000 Pcs'],
            114 => ['title' => 'Camel Brown Ribbed Fine-Gauge Crewneck Knit Sweater', 'category' => 'Knitwear', 'gsm' => '280 GSM', 'moq' => '800 Pcs'],
            115 => ['title' => 'Nordic Geometric Jacquard Long-Sleeve Knit Sweater', 'category' => 'Knitwear', 'gsm' => '340 GSM', 'moq' => '800 Pcs'],
            116 => ['title' => 'Light Heather Grey Mock-Neck Quarter-Zip Knit Top', 'category' => 'Knitwear', 'gsm' => '280 GSM', 'moq' => '800 Pcs'],
            117 => ['title' => 'Honeycomb Jacquard Textured Crewneck Knit Sweater', 'category' => 'Knitwear', 'gsm' => '320 GSM', 'moq' => '800 Pcs'],
            118 => ['title' => 'Coffee Brown Chunky-Rib Stand Collar Knit Sweater', 'category' => 'Knitwear', 'gsm' => '380 GSM', 'moq' => '600 Pcs'],
            119 => ['title' => 'Cobalt Blue Melange Fisherman Ribbed Knit Sweater', 'category' => 'Knitwear', 'gsm' => '360 GSM', 'moq' => '800 Pcs'],
            120 => ['title' => 'Charcoal Crewneck Knit Sweater with Suede Elbow Patches', 'category' => 'Knitwear', 'gsm' => '320 GSM', 'moq' => '800 Pcs'],
        ];
        for ($i = 1; $i <= 120; $i++) {
            $def = $mensTitles[$i];
            $seeds[] = array_merge($def, [
                'client_slug' => 'mens',
                'image_url' => "images/mens/{$i}.jpg",
                'order' => $i,
                'is_active' => true,
            ]);
        }

        // 11. Womens Collection (100 items - Visually Identified)
        $womensTitles = [
            1 => ['title' => '"Chase the Sun" Royal Blue Cap-Sleeve Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,200 Pcs'],
            2 => ['title' => '"Beach Days" Magenta Racerback Ribbed Tank Top', 'category' => 'Tops & Tanks', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            3 => ['title' => '"Sun Kissed" Lime Green Rolled Cap-Sleeve Slub Tee', 'category' => 'T-Shirts', 'gsm' => '150 GSM', 'moq' => '1,500 Pcs'],
            4 => ['title' => 'Black & White Breton Striped V-Neck Cotton Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            5 => ['title' => 'Washed Black Racerback Jersey Tank Top', 'category' => 'Tops & Tanks', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            6 => ['title' => 'Charcoal Ribbed Cami Tank Top with Lace Trim', 'category' => 'Tops & Tanks', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            7 => ['title' => 'Lime Green Trapeze A-Line Flowy Cami Tank', 'category' => 'Tops & Tanks', 'gsm' => '150 GSM', 'moq' => '1,500 Pcs'],
            8 => ['title' => 'Flamingo Print V-Neck Sleepwear T-Shirt Dress', 'category' => 'Sleepwear', 'gsm' => '160 GSM', 'moq' => '1,200 Pcs'],
            9 => ['title' => 'Multi-Color Dolphin-Hem Lounge Booty Shorts Pack', 'category' => 'Loungewear', 'gsm' => '180 GSM', 'moq' => '2,000 Pcs'],
            10 => ['title' => 'Lace-Trimmed Henley Tank & Boyshorts Lounge Set', 'category' => 'Loungewear', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            11 => ['title' => '"Cool Cat" Slub Heather Tank & Leopard Shorts Pajama Set', 'category' => 'Sleepwear', 'gsm' => '170 GSM', 'moq' => '1,200 Pcs'],
            12 => ['title' => 'Pop Art Lips White Tee & Printed Lounge Shorts Pajama Set', 'category' => 'Sleepwear', 'gsm' => '170 GSM', 'moq' => '1,200 Pcs'],
            13 => ['title' => '"Hello Summer" Heather Tee & Popsicle Print Pants Pajama Set', 'category' => 'Sleepwear', 'gsm' => '170 GSM', 'moq' => '1,200 Pcs'],
            14 => ['title' => 'Sleeping Unicorn Tee & Star Print Capri Sleepwear Set', 'category' => 'Sleepwear', 'gsm' => '170 GSM', 'moq' => '1,200 Pcs'],
            15 => ['title' => 'White Swiss-Dot Textured Racerback Cotton Tank Top', 'category' => 'Tops & Tanks', 'gsm' => '150 GSM', 'moq' => '1,500 Pcs'],
            16 => ['title' => '"Brilliant Look" Contrast Ringer Cap-Sleeve Athletic Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            17 => ['title' => '"Pretty Football" Vintage Varsity Graphic Scoop Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            18 => ['title' => 'Official Looney Tunes™ Bugs Bunny Oversized Pink Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            19 => ['title' => 'Bugs Bunny & Friends All-Over Print Pastel Pink Crew Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            20 => ['title' => 'Geometric Botanical Pattern 3/4 Sleeve Cotton Blouse Top', 'category' => 'Tops & Tanks', 'gsm' => '160 GSM', 'moq' => '1,200 Pcs'],
            21 => ['title' => '"Ladies Night" Flintstones Spaghetti Strap Nightdress', 'category' => 'Sleepwear', 'gsm' => '160 GSM', 'moq' => '1,200 Pcs'],
            22 => ['title' => 'Monochrome Polka Dot Scoop Neck Jersey Tank Top', 'category' => 'Tops & Tanks', 'gsm' => '150 GSM', 'moq' => '1,500 Pcs'],
            23 => ['title' => 'Navy All-Over Social Media Icon Stretch Leggings', 'category' => 'Pants & Bottoms', 'gsm' => '220 GSM', 'moq' => '1,500 Pcs'],
            24 => ['title' => 'Neon Magenta & Green Leopard Print Athletic Racerback Tank', 'category' => 'Activewear', 'gsm' => '190 GSM', 'moq' => '1,500 Pcs'],
            25 => ['title' => 'Tropical Pineapple Print Sleeveless Summer Jersey Dress', 'category' => 'Dresses', 'gsm' => '160 GSM', 'moq' => '1,200 Pcs'],
            26 => ['title' => 'Illustrated Fashion Girl with Ruffle Sleeves White Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            27 => ['title' => 'Official Looney Tunes™ Lola Bunny 1921 Graphic White Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            28 => ['title' => 'Striped & Geometric Mixed Media Chic Peplum Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            29 => ['title' => 'Magenta Pink & Black Floral Long-Sleeve Crewneck Top', 'category' => 'Tops & Tanks', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            30 => ['title' => '"Besties Forever" Cartoon Best Friends Baby Pink Long Sleeve', 'category' => 'Tops & Tanks', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            31 => ['title' => 'Nordic Fair Isle Chunky Knit Crewneck Crop Sweater', 'category' => 'Knitwear', 'gsm' => '420 GSM', 'moq' => '800 Pcs'],
            32 => ['title' => 'Cream Cable-Knit Lace-Up V-Neck Long-Sleeve Sweater', 'category' => 'Knitwear', 'gsm' => '400 GSM', 'moq' => '800 Pcs'],
            33 => ['title' => 'Mustard Yellow Chunky Ribbed Open Cardigan with Shawl Collar', 'category' => 'Knitwear', 'gsm' => '450 GSM', 'moq' => '600 Pcs'],
            34 => ['title' => 'Crimson Red Chenille Mock-Neck Balloon-Sleeve Sweater', 'category' => 'Knitwear', 'gsm' => '380 GSM', 'moq' => '800 Pcs'],
            35 => ['title' => 'Rust Terracotta Chenille High-Neck Relaxed Pullover', 'category' => 'Knitwear', 'gsm' => '380 GSM', 'moq' => '800 Pcs'],
            36 => ['title' => 'Cream, Ochre & Rust Tricolor Block Chunky Knit Sweater', 'category' => 'Knitwear', 'gsm' => '420 GSM', 'moq' => '800 Pcs'],
            37 => ['title' => 'Forest Green Textured Cable & Distressed Open-Knit Sweater', 'category' => 'Knitwear', 'gsm' => '400 GSM', 'moq' => '800 Pcs'],
            38 => ['title' => 'Emerald Green & Cream Two-Tone Cropped Knit Sweater', 'category' => 'Knitwear', 'gsm' => '390 GSM', 'moq' => '800 Pcs'],
            39 => ['title' => 'Oatmeal Heather Balloon-Sleeve Soft Knit Crewneck Sweater', 'category' => 'Knitwear', 'gsm' => '400 GSM', 'moq' => '800 Pcs'],
            40 => ['title' => 'Cream Pointelle Wave-Stitched Cropped Boat-Neck Knit Sweater', 'category' => 'Knitwear', 'gsm' => '360 GSM', 'moq' => '800 Pcs'],
            41 => ['title' => 'Terracotta Choker Cutout Knit Cropped Sweater', 'category' => 'Knitwear', 'gsm' => '380 GSM', 'moq' => '800 Pcs'],
            42 => ['title' => 'Cobalt Blue Leopard Jacquard Knitted Crewneck Pullover', 'category' => 'Knitwear', 'gsm' => '420 GSM', 'moq' => '800 Pcs'],
            43 => ['title' => 'Periwinkle Lavender Ruffle Mock-Neck Ribbed Knit Sweater', 'category' => 'Knitwear', 'gsm' => '360 GSM', 'moq' => '800 Pcs'],
            44 => ['title' => 'Classic Royal Cobalt Open-Front Draped Long Cardigan', 'category' => 'Knitwear', 'gsm' => '400 GSM', 'moq' => '600 Pcs'],
            45 => ['title' => 'Cream Textured Wave Cropped Bell-Sleeve Knit Sweater', 'category' => 'Knitwear', 'gsm' => '390 GSM', 'moq' => '800 Pcs'],
            46 => ['title' => 'Heather Grey Sleeveless Cable-Knit Layering Sweater Vest', 'category' => 'Knitwear', 'gsm' => '350 GSM', 'moq' => '1,000 Pcs'],
            47 => ['title' => 'Forest Green, White & Ochre Wide-Stripe Chunky Cardigan', 'category' => 'Knitwear', 'gsm' => '450 GSM', 'moq' => '600 Pcs'],
            48 => ['title' => 'Jet Black Cold-Shoulder Slouchy Chunky Knit Sweater', 'category' => 'Knitwear', 'gsm' => '420 GSM', 'moq' => '800 Pcs'],
            49 => ['title' => 'Rust Orange Cropped Chunky Horn-Button Cardigan', 'category' => 'Knitwear', 'gsm' => '440 GSM', 'moq' => '800 Pcs'],
            50 => ['title' => 'Charcoal Grey Pointelle Open-Work Yoke Knit Sweater', 'category' => 'Knitwear', 'gsm' => '380 GSM', 'moq' => '800 Pcs'],
            51 => ['title' => 'Mustard Yellow & Brown Tiger Stripe Brushed Mohair Sweater', 'category' => 'Knitwear', 'gsm' => '400 GSM', 'moq' => '800 Pcs'],
            52 => ['title' => 'Cream, Crimson & Burgundy Chevron V-Yoke Varsity Sweater', 'category' => 'Knitwear', 'gsm' => '420 GSM', 'moq' => '800 Pcs'],
            53 => ['title' => 'Light Wash Denim Button-Down Long-Sleeve Shirt', 'category' => 'Denim', 'gsm' => '6.5 OZ', 'moq' => '1,000 Pcs'],
            54 => ['title' => 'Vintage Distressed Light Blue Denim Trucker Jacket', 'category' => 'Denim', 'gsm' => '11 OZ', 'moq' => '800 Pcs'],
            55 => ['title' => 'Chambray Blue Belted Long-Sleeve Denim Shirt Dress', 'category' => 'Denim', 'gsm' => '7 OZ', 'moq' => '1,000 Pcs'],
            56 => ['title' => 'Lilac Floral Print Short-Sleeve Drawstring Summer Dress', 'category' => 'Dresses', 'gsm' => '150 GSM', 'moq' => '1,200 Pcs'],
            57 => ['title' => 'Palm Foliage Botanical Print Long-Sleeve Tunic Shirt', 'category' => 'Shirts & Blouses', 'gsm' => '140 GSM', 'moq' => '1,200 Pcs'],
            58 => ['title' => 'Monochrome Micro-Print Hi-Low Button-Up Cotton Blouse', 'category' => 'Shirts & Blouses', 'gsm' => '130 GSM', 'moq' => '1,200 Pcs'],
            59 => ['title' => 'Pastel Sky Blue Floral Embroidered Stripe Popover Tunic', 'category' => 'Shirts & Blouses', 'gsm' => '140 GSM', 'moq' => '1,200 Pcs'],
            60 => ['title' => 'Olive & White Vertical Stripe Mandarin Collar Henley Blouse', 'category' => 'Shirts & Blouses', 'gsm' => '135 GSM', 'moq' => '1,200 Pcs'],
            61 => ['title' => 'Navy & White All-Over Botanical Print Short-Sleeve Blouse', 'category' => 'Shirts & Blouses', 'gsm' => '140 GSM', 'moq' => '1,200 Pcs'],
            62 => ['title' => 'Solid Jet Black 3-Button Henley Short-Sleeve Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            63 => ['title' => 'Black Ditsy Floral Sleeveless Scoop-Neck Flowy Tank Blouse', 'category' => 'Tops & Tanks', 'gsm' => '140 GSM', 'moq' => '1,500 Pcs'],
            64 => ['title' => 'Deep Sea Teal Draped Scoop-Neck Sleeveless Blouse Top', 'category' => 'Tops & Tanks', 'gsm' => '150 GSM', 'moq' => '1,500 Pcs'],
            65 => ['title' => 'White Micro-Dot 3/4 Sleeve Cotton Peasant Blouse', 'category' => 'Shirts & Blouses', 'gsm' => '135 GSM', 'moq' => '1,200 Pcs'],
            66 => ['title' => 'Berry Magenta Split-Neck Short-Sleeve Flowy Blouse Top', 'category' => 'Shirts & Blouses', 'gsm' => '140 GSM', 'moq' => '1,200 Pcs'],
            67 => ['title' => 'Washed Indigo Chambray Elastic-Waist Relaxed Jogger Pants', 'category' => 'Pants & Bottoms', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            68 => ['title' => 'Charcoal Grey Washed Hand-Sanded Stretch Denim Jeans', 'category' => 'Pants & Bottoms', 'gsm' => '10.5 OZ', 'moq' => '1,200 Pcs'],
            69 => ['title' => 'Olive Drab Cotton Twill Utility Cargo Jogger Pants', 'category' => 'Pants & Bottoms', 'gsm' => '240 GSM', 'moq' => '1,200 Pcs'],
            70 => ['title' => 'Taupe Sand Washed Slim Stretch Cotton Twill Trousers', 'category' => 'Pants & Bottoms', 'gsm' => '230 GSM', 'moq' => '1,200 Pcs'],
            71 => ['title' => 'High-Shine Gloss Black Hooded Winter Puffer Jacket with Faux Fur', 'category' => 'Jackets & Outerwear', 'gsm' => '280 GSM', 'moq' => '800 Pcs'],
            72 => ['title' => 'Olive Drab Diamond-Quilted Lightweight Snap Bomber Jacket', 'category' => 'Jackets & Outerwear', 'gsm' => '220 GSM', 'moq' => '800 Pcs'],
            73 => ['title' => 'Crimson Red Channel-Quilted Zip-Up Lightweight Puffer Jacket', 'category' => 'Jackets & Outerwear', 'gsm' => '240 GSM', 'moq' => '800 Pcs'],
            74 => ['title' => 'Deep Teal Green Diamond-Quilted Hooded Cold-Weather Jacket', 'category' => 'Jackets & Outerwear', 'gsm' => '260 GSM', 'moq' => '800 Pcs'],
            75 => ['title' => 'Clean White Ultra-Light Horizontal Quilted Puffer Vest', 'category' => 'Jackets & Outerwear', 'gsm' => '180 GSM', 'moq' => '1,000 Pcs'],
            76 => ['title' => 'Crimson Red Packable Channel-Quilted Stand-Collar Puffer Vest', 'category' => 'Jackets & Outerwear', 'gsm' => '180 GSM', 'moq' => '1,000 Pcs'],
            77 => ['title' => 'Sage Olive Channel-Quilted Lightweight Thermal Puffer Vest', 'category' => 'Jackets & Outerwear', 'gsm' => '180 GSM', 'moq' => '1,000 Pcs'],
            78 => ['title' => 'Camel Tan Heavy Duty Winter Parka with Faux-Fur Trimmed Hood', 'category' => 'Jackets & Outerwear', 'gsm' => '320 GSM', 'moq' => '600 Pcs'],
            79 => ['title' => 'Soft Lavender Lilac Fine-Knit V-Neck Long-Sleeve Sweater', 'category' => 'Knitwear', 'gsm' => '260 GSM', 'moq' => '1,000 Pcs'],
            80 => ['title' => 'Soft Lavender Lilac Fine-Knit Drop-Shoulder Pullover', 'category' => 'Knitwear', 'gsm' => '260 GSM', 'moq' => '1,000 Pcs'],
            81 => ['title' => 'Pastel Sky Blue Raglan Tee with "Live in Sunshine" Butterfly Graphic', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            82 => ['title' => 'Pastel Sky Blue & Heather Navy Contrast Raglan Sleeve T-Shirt', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            83 => ['title' => 'Slate Navy French Terry Zip Track Jacket & Sweatpants Lounge Set', 'category' => 'Loungewear', 'gsm' => '280 GSM', 'moq' => '1,000 Pcs'],
            84 => ['title' => 'Jet Black Crewneck Graphic Tee with "CHECK MEOWT" Cat Graphic', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            85 => ['title' => 'Cream Scalloped Lettuce-Edge Ribbed Crop Cami Tank Top', 'category' => 'Tops & Tanks', 'gsm' => '190 GSM', 'moq' => '1,500 Pcs'],
            86 => ['title' => 'Monochrome Colorblock Athletic Half-Zip Long-Sleeve Bodysuit', 'category' => 'Activewear', 'gsm' => '240 GSM', 'moq' => '1,200 Pcs'],
            87 => ['title' => 'Black & White Breton Stripe Half-Zip Mock-Neck Ribbed Athletic Top', 'category' => 'Activewear', 'gsm' => '210 GSM', 'moq' => '1,200 Pcs'],
            88 => ['title' => 'Marigold Mustard Ribbed Knit Camisole Crop Top with Spaghetti Straps', 'category' => 'Tops & Tanks', 'gsm' => '200 GSM', 'moq' => '1,500 Pcs'],
            89 => ['title' => 'Marigold Mustard Elastic Ribbed Summer Bralette Crop Top', 'category' => 'Tops & Tanks', 'gsm' => '200 GSM', 'moq' => '1,500 Pcs'],
            90 => ['title' => 'White Long-Sleeve Crop Tee with "SPRINGFIELD" Red Varsity Graphic', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            91 => ['title' => 'Jet Black Lace-Trimmed Asymmetric Handkerchief Chiffon Cami Top', 'category' => 'Tops & Tanks', 'gsm' => '130 GSM', 'moq' => '1,200 Pcs'],
            92 => ['title' => 'White Bohemian Summer Tank Top with Aztec Embroidery & Fringe Hem', 'category' => 'Tops & Tanks', 'gsm' => '150 GSM', 'moq' => '1,200 Pcs'],
            93 => ['title' => 'White Summer Racerback Tank with Lace Yoke & Fringe Tassels', 'category' => 'Tops & Tanks', 'gsm' => '150 GSM', 'moq' => '1,200 Pcs'],
            94 => ['title' => 'Royal Cobalt Blue Off-The-Shoulder Ruffle Flounce Blouse', 'category' => 'Shirts & Blouses', 'gsm' => '140 GSM', 'moq' => '1,200 Pcs'],
            95 => ['title' => 'Solid Black Chiffon Double-Layer Handkerchief Hem Camisole Top', 'category' => 'Tops & Tanks', 'gsm' => '130 GSM', 'moq' => '1,200 Pcs'],
            96 => ['title' => 'Hot Pink & Black Contrast Ribbed Long-Sleeve Fitted Knit Top', 'category' => 'Knitwear', 'gsm' => '260 GSM', 'moq' => '1,200 Pcs'],
            97 => ['title' => 'Olive Drab Cold-Shoulder Slub Tank Top with Fringe Tassels', 'category' => 'Tops & Tanks', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            98 => ['title' => 'Pastel Lilac & Tie-Dye Seamless Racerback Sports Bra & Crop Top Set', 'category' => 'Activewear', 'gsm' => '250 GSM', 'moq' => '1,500 Pcs'],
            99 => ['title' => 'Coral Pink Sunburst Tie-Dye Ribbed Scoop-Neck Crop Tank', 'category' => 'Tops & Tanks', 'gsm' => '190 GSM', 'moq' => '1,500 Pcs'],
            100 => ['title' => 'Mint Green Cloud Tie-Dye Oversized Drop-Shoulder Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
        ];
        for ($i = 1; $i <= 100; $i++) {
            $def = $womensTitles[$i];
            $seeds[] = array_merge($def, [
                'client_slug' => 'womens',
                'image_url' => "images/womens/{$i}.jpg",
                'order' => $i,
                'is_active' => true,
            ]);
        }

        // 12. Kids & Babywear Collection (36 items - Visually Identified)
        $kidsTitles = [
            1 => ['title' => 'Boys Turquoise N-Y-C Sports Team Pique Polo Shirt (#3 Sleeve)', 'category' => 'Polo Shirts', 'gsm' => '200 GSM', 'moq' => '1,200 Pcs'],
            2 => ['title' => 'Boys Olive & White Yarn-Dyed Fine Stripe Zip Polo', 'category' => 'Polo Shirts', 'gsm' => '200 GSM', 'moq' => '1,200 Pcs'],
            3 => ['title' => 'Boys Slate Navy Multi-Stripe Pique Polo with Woven Collar', 'category' => 'Polo Shirts', 'gsm' => '210 GSM', 'moq' => '1,200 Pcs'],
            4 => ['title' => 'Boys White Engineered Breton Stripe Pique Polo Shirt', 'category' => 'Polo Shirts', 'gsm' => '200 GSM', 'moq' => '1,200 Pcs'],
            5 => ['title' => 'Boys Solid Coral Red Pique Cotton Polo with Embroidery', 'category' => 'Polo Shirts', 'gsm' => '210 GSM', 'moq' => '1,200 Pcs'],
            6 => ['title' => 'Boys Plum Wine Melange Solid Polo with Bear Embroidery', 'category' => 'Polo Shirts', 'gsm' => '200 GSM', 'moq' => '1,200 Pcs'],
            7 => ['title' => '"History Be Wind" Dip-Dyed Gradient Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            8 => ['title' => 'Boys Heather Grey & Navy Color-Block Pocket Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            9 => ['title' => 'Off-Road Monster Truck Doodle Print Grey Melange Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            10 => ['title' => 'Cobalt Blue Tee with Red Textured Fish Applique', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            11 => ['title' => 'Official Jurassic World™ All-Over Dinosaur Camo Print Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            12 => ['title' => '"Wander and Explore" Botanical Foliage Print Grey Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            13 => ['title' => 'Surfing Palm Trees & Tropical Juice All-Over Print Cream Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            14 => ['title' => 'American Flag & Vintage Travel Quote Dip-Dyed Cotton Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            15 => ['title' => '"Feel Rider" Blue Superbike Photographic Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            16 => ['title' => '"Skate Pro" Heather Grey Varsity Athletic Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            17 => ['title' => 'Burgundy & Navy Heather Striped Pocket Crewneck Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            18 => ['title' => 'Dino Head Pop-Out Contrast Dot Raglan Sleeve Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            19 => ['title' => 'Quirky Googly Eyes Monster Graphic Ringer T-Shirt', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            20 => ['title' => '"Let\'s Rock" Guitarist Dinosaur White Curved-Hem Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            21 => ['title' => '"More Fun Now" Pastel Sky Blue Vintage Sun Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            22 => ['title' => '"Biker 01" Blue & Yellow Striped Contrast Raglan Henley', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            23 => ['title' => 'Heather Denim Slub Mandarin Collar Split-V Henley T-Shirt', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            24 => ['title' => 'Royal Blue Color-Block Tee with Kangaroo Utility Pocket', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            25 => ['title' => '"#Trust Me I\'m Too Cute!" Black Heather Neon Text Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            26 => ['title' => 'Mint Heather Minimalist Hashtag Long-Sleeve Cotton Tee', 'category' => 'Long Sleeves', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            27 => ['title' => '"Funny Zebra" Lime & Orange Striped Cartoon Long Sleeve', 'category' => 'Long Sleeves', 'gsm' => '190 GSM', 'moq' => '1,500 Pcs'],
            28 => ['title' => 'Navy & White Yarn-Dyed Breton Stripe Long-Sleeve Crew Top', 'category' => 'Long Sleeves', 'gsm' => '190 GSM', 'moq' => '1,500 Pcs'],
            29 => ['title' => '"Ho Ho Ho!" Christmas Snowman Navy Holiday Long Sleeve', 'category' => 'Long Sleeves', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            30 => ['title' => 'Red Off-Road Monster Mud-Racer Long-Sleeve Graphic Tee', 'category' => 'Long Sleeves', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            31 => ['title' => 'Pastel Baby Blue Ribbed Button-Placket Henley Long Sleeve', 'category' => 'Long Sleeves', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            32 => ['title' => 'Vintage Military Warplanes & Jets Charcoal Long Sleeve', 'category' => 'Long Sleeves', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            33 => ['title' => 'Ocean Blue French Terry Drawstring Sweat Shorts', 'category' => 'Shorts', 'gsm' => '220 GSM', 'moq' => '1,500 Pcs'],
            34 => ['title' => 'Swimming Sharks All-Over Print Cotton Harem Toddler Shorts', 'category' => 'Shorts', 'gsm' => '200 GSM', 'moq' => '1,500 Pcs'],
            35 => ['title' => 'Navy Blue French Terry Athletic Shorts with Stag Embroidery', 'category' => 'Shorts', 'gsm' => '230 GSM', 'moq' => '1,500 Pcs'],
            36 => ['title' => 'Heather Grey Tailored Shorts with Chambray Waistband', 'category' => 'Shorts', 'gsm' => '220 GSM', 'moq' => '1,500 Pcs'],
            37 => ['title' => 'Girls White Denim Cuffed Shorts with Braided Metallic Belt', 'category' => 'Denim', 'gsm' => '9.5 OZ', 'moq' => '1,200 Pcs'],
            38 => ['title' => 'Toddler Distressed Hand-Sanded Mid-Wash Denim Jeans', 'category' => 'Denim', 'gsm' => '10 OZ', 'moq' => '1,200 Pcs'],
            39 => ['title' => 'Girls Indigo Stretch Denim Jeans with All-Over Pink Hearts', 'category' => 'Denim', 'gsm' => '9.5 OZ', 'moq' => '1,200 Pcs'],
            40 => ['title' => 'Toddler Girls Ruffle Tiered Chambray Denim Baby Dress', 'category' => 'Dresses', 'gsm' => '140 GSM', 'moq' => '1,200 Pcs'],
            41 => ['title' => 'Girls Medium Blue Hand-Abraded Denim Cut-Off Shorts', 'category' => 'Denim', 'gsm' => '10 OZ', 'moq' => '1,200 Pcs'],
            42 => ['title' => 'Girls Dark Indigo 5-Pocket Rolled Denim Shorts with Fraying', 'category' => 'Denim', 'gsm' => '10.5 OZ', 'moq' => '1,200 Pcs'],
            43 => ['title' => 'Boys Classic Straight-Leg Mid-Blue Wash Denim Jeans', 'category' => 'Denim', 'gsm' => '11 OZ', 'moq' => '1,200 Pcs'],
            44 => ['title' => 'Boys Heather Grey "COOL" Sweatshirt with Camo Arm Stripes', 'category' => 'Sweatshirts', 'gsm' => '260 GSM', 'moq' => '1,000 Pcs'],
            45 => ['title' => 'Boys Royal Navy Grid-Check Engineered Pique Polo Shirt', 'category' => 'Polo Shirts', 'gsm' => '210 GSM', 'moq' => '1,200 Pcs'],
            46 => ['title' => 'Boys "NOW OR NEVER" Graphic Tee & Cobalt Athletic Shorts Set', 'category' => 'Co-ord Sets', 'gsm' => '170 GSM', 'moq' => '1,200 Sets'],
            47 => ['title' => 'Boys Clean White Crewneck Tee with Navy Contrast Chest Pocket', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            48 => ['title' => 'Boys Dinosaur Camo Long-Sleeve Tee & Charcoal Joggers Set', 'category' => 'Co-ord Sets', 'gsm' => '190 GSM', 'moq' => '1,200 Sets'],
            49 => ['title' => 'Toddler Girls White 1x1 Rib Cotton Tank Undershirt with Picot Trim', 'category' => 'Babywear', 'gsm' => '180 GSM', 'moq' => '2,000 Pcs'],
            50 => ['title' => 'Toddler Girls White Ribbed Cotton Camisole Vest with Contrast Trim', 'category' => 'Babywear', 'gsm' => '180 GSM', 'moq' => '2,000 Pcs'],
            51 => ['title' => 'Girls Disney Princess Jasmine "#SELFIE" Heather Grey Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            52 => ['title' => 'Toddler Girls Disney Minnie Mouse Light Pink Ruffle-Sleeve Tee', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            53 => ['title' => 'Girls Hot Pink Cap-Sleeve Tee with Polka-Dot Star Applique Graphic', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            54 => ['title' => 'Boys Heather Grey Raglan Sweatshirt with Pink Camo Sleeves & "#2"', 'category' => 'Sweatshirts', 'gsm' => '260 GSM', 'moq' => '1,000 Pcs'],
            55 => ['title' => 'Toddler Girls Disney Frozen Elsa Striped Skater Dress with Frill', 'category' => 'Dresses', 'gsm' => '160 GSM', 'moq' => '1,200 Pcs'],
            56 => ['title' => 'Girls Jet Black Full-Length Stretch Leggings with Heart Print', 'category' => 'Pants & Leggings', 'gsm' => '200 GSM', 'moq' => '1,500 Pcs'],
            57 => ['title' => 'Toddler Girls Yellow Sunglasses Top & Pink Terry Shorts Set', 'category' => 'Co-ord Sets', 'gsm' => '170 GSM', 'moq' => '1,500 Sets'],
            58 => ['title' => 'Girls Tropical Flamingo Stripe Tee & Blush Pink Bike Shorts Set', 'category' => 'Co-ord Sets', 'gsm' => '170 GSM', 'moq' => '1,500 Sets'],
            59 => ['title' => 'Girls Aqua Turquoise "California" Tee & Floral Shorts Outfit Set', 'category' => 'Co-ord Sets', 'gsm' => '170 GSM', 'moq' => '1,500 Sets'],
            60 => ['title' => 'Girls Navy Disney Minnie Mouse Tee & Silver Foil Shorts Set', 'category' => 'Co-ord Sets', 'gsm' => '170 GSM', 'moq' => '1,500 Sets'],
            61 => ['title' => 'Girls White Minnie Mouse Stripe Tee & Cobalt Blue Leggings Set', 'category' => 'Co-ord Sets', 'gsm' => '180 GSM', 'moq' => '1,500 Sets'],
            62 => ['title' => 'Toddler Girls Lavender Butterfly Long-Sleeve Pajama Sleep Set', 'category' => 'Sleepwear', 'gsm' => '180 GSM', 'moq' => '1,200 Sets'],
            63 => ['title' => 'Toddler Girls Sky Blue Stretch Capri Leggings with Palm Tree Print', 'category' => 'Pants & Leggings', 'gsm' => '190 GSM', 'moq' => '1,500 Pcs'],
            64 => ['title' => 'Girls Neon Green & Hot Pink Leopard Athletic Racerback Tank', 'category' => 'Activewear', 'gsm' => '190 GSM', 'moq' => '1,500 Pcs'],
            65 => ['title' => 'Girls Fashion Girl Graphic Tee with Blue Leopard Bow & Frill Sleeves', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            66 => ['title' => 'Toddler Girls Grey Melange Tee with Floral Bicycle & Ruffle Hem', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            67 => ['title' => 'Toddler Girls Grey Heather Tee with Botanical Watercolor Wreath', 'category' => 'T-Shirts', 'gsm' => '160 GSM', 'moq' => '1,500 Pcs'],
            68 => ['title' => 'Girls Nautical Stripe Mixed-Panel Peplum Fashion Graphic Tee', 'category' => 'T-Shirts', 'gsm' => '170 GSM', 'moq' => '1,500 Pcs'],
            69 => ['title' => 'Girls Hot Pink All-Over Floral Print Long-Sleeve Crewneck Top', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,200 Pcs'],
            70 => ['title' => 'Girls Vibrant Magenta Long-Sleeve Tee with Glittering Unicorn', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            71 => ['title' => 'Toddler Girls Baby Pink Long Sleeve with "BESTIES FOREVER" Cartoon', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
            72 => ['title' => 'Toddler Boys 2-Pack Long Sleeve Tees (Breton Stripe & Monster Graphic)', 'category' => 'Long Sleeves', 'gsm' => '180 GSM', 'moq' => '1,200 Packs'],
            73 => ['title' => 'Toddler Girls Magenta Knitted Cardigan with Floral Lace Yoke & Pockets', 'category' => 'Knitwear', 'gsm' => '320 GSM', 'moq' => '800 Pcs'],
            74 => ['title' => 'Toddler Girls Teal Knitted Button Cardigan with Daisy Floral Vine', 'category' => 'Knitwear', 'gsm' => '340 GSM', 'moq' => '800 Pcs'],
            75 => ['title' => 'Toddler Off-White Raglan Knitted Pullover Sweater with Rib Trims', 'category' => 'Knitwear', 'gsm' => '320 GSM', 'moq' => '800 Pcs'],
            76 => ['title' => 'Toddler Purple Heather Waffle-Knit Button-Up Cardigan', 'category' => 'Knitwear', 'gsm' => '300 GSM', 'moq' => '800 Pcs'],
            77 => ['title' => 'Toddler Oatmeal Beige Garter-Stitch Horn-Button Knit Cardigan', 'category' => 'Knitwear', 'gsm' => '340 GSM', 'moq' => '800 Pcs'],
            78 => ['title' => 'Toddler Girls Breton Stripe Long Sleeve with Illustrated Bunny Rabbit', 'category' => 'T-Shirts', 'gsm' => '180 GSM', 'moq' => '1,500 Pcs'],
        ];
        for ($i = 1; $i <= 78; $i++) {
            $def = $kidsTitles[$i];
            $ext = ($i === 78) ? 'png' : 'jpg';
            $seeds[] = array_merge($def, [
                'client_slug' => 'kids',
                'image_url' => "images/kids/{$i}.{$ext}",
                'order' => $i,
                'is_active' => true,
            ]);
        }

        return $seeds;
    }

    public static function getCategoryGallery(string $slug): array
    {
        return array_values(array_filter(
            self::getCatalogSeeds(),
            static fn (array $item): bool => $item['client_slug'] === $slug
        ));
    }

    /**
     * Synchronizes and seeds all 163 catalog styles into MySQL database
     */
    public static function syncAll(): int
    {
        $seeds = self::getCatalogSeeds();
        $count = 0;

        foreach ($seeds as $item) {
            Gallery::updateOrCreate(
                [
                    'client_slug' => $item['client_slug'],
                    'image_url' => $item['image_url'],
                ],
                [
                    'title' => $item['title'],
                    'category' => $item['category'],
                    'gsm' => $item['gsm'],
                    'moq' => $item['moq'],
                    'order' => $item['order'],
                    'is_active' => $item['is_active'] ?? true,
                ]
            );
            $count++;
        }

        return $count;
    }
}
