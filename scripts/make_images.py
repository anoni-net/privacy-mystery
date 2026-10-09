#!/usr/bin/env python3
"""Turn rendered PNGs of the case art into the JPEG assets the game serves.

The leaked photo gets the exact EXIF the story depends on (Pixel 7a, UTC+9
offset, no GPS), so players can verify it with their own exiftool. Social
photos carry no camera metadata, the way social platforms strip it on upload.

Usage: python3 scripts/make_images.py <dir with art_<name>.png> <case dir>
Requires: Pillow, piexif
"""
import sys
from pathlib import Path

import piexif
from PIL import Image

PXL = 'PXL_20260914_144712345.jpg'


def leaked_photo_exif():
    zeroth = {
        piexif.ImageIFD.Make: b'Google',
        piexif.ImageIFD.Model: b'Pixel 7a',
        piexif.ImageIFD.Software: b'HDR+ 1.0.641377693',
        piexif.ImageIFD.Orientation: 1,
        piexif.ImageIFD.DateTime: b'2026:09:14 23:47:12',
        piexif.ImageIFD.XResolution: (72, 1),
        piexif.ImageIFD.YResolution: (72, 1),
        piexif.ImageIFD.ResolutionUnit: 2,
    }
    exif = {
        piexif.ExifIFD.ExifVersion: b'0232',
        piexif.ExifIFD.DateTimeOriginal: b'2026:09:14 23:47:12',
        piexif.ExifIFD.DateTimeDigitized: b'2026:09:14 23:47:12',
        piexif.ExifIFD.SubSecTimeOriginal: b'345',
        0x9010: b'+09:00',  # OffsetTime
        0x9011: b'+09:00',  # OffsetTimeOriginal
        0x9012: b'+09:00',  # OffsetTimeDigitized
        piexif.ExifIFD.FNumber: (19, 10),
        piexif.ExifIFD.ExposureTime: (1, 30),
        piexif.ExifIFD.ISOSpeedRatings: 1250,
        piexif.ExifIFD.Flash: 16,  # Off, did not fire
        piexif.ExifIFD.FocalLength: (540, 100),
        piexif.ExifIFD.PixelXDimension: 4080,
        piexif.ExifIFD.PixelYDimension: 3072,
    }
    # No GPS IFD: 夜鷺 turned location off.
    return piexif.dump({'0th': zeroth, 'Exif': exif, 'GPS': {}, '1st': {}, 'thumbnail': None})


def main(src, case):
    src, web = Path(src), Path(case) / 'web' / 'assets'
    (web / 'social').mkdir(parents=True, exist_ok=True)
    for png in sorted(src.glob('art_*.png')):
        name = png.stem[4:]
        img = Image.open(png).convert('RGB')
        if name == 'photo':
            out = web / PXL
            img.save(out, 'JPEG', quality=86, exif=leaked_photo_exif())
        else:
            out = web / 'social' / f'{name}.jpg'
            img.save(out, 'JPEG', quality=82, comment=b'Processed by PicNote')
        print(f'{out.relative_to(Path(case))}  {out.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main(*sys.argv[1:3])
