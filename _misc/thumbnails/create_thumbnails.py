import os
from PIL import Image

def create_thumbnails(folder_path, thumb_size=64):
    thumbs_dir = os.path.join(folder_path, 'thumbs')
    os.makedirs(thumbs_dir, exist_ok=True)

    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        if os.path.isfile(file_path):
            try:
                with Image.open(file_path) as img:
                    # Compute new size preserving aspect ratio
                    width, height = img.size
                    if width < height:
                        new_width = thumb_size
                        new_height = int((thumb_size / width) * height)
                    else:
                        new_height = thumb_size
                        new_width = int((thumb_size / height) * width)

                    img = img.resize((new_width, new_height), Image.LANCZOS)
                    # Crop the center to make smaller dimension exactly thumb_size if needed
                    left = (new_width - thumb_size) // 2
                    top = (new_height - thumb_size) // 2
                    right = left + thumb_size
                    bottom = top + thumb_size
                    thumb = img.crop((left, top, right, bottom))

                    thumb_filename = os.path.join(thumbs_dir, filename)
                    thumb.save(thumb_filename)
                    print(f"Saved thumbnail: {thumb_filename}")
            except Exception as e:
                print(f"Skipped {filename}: {e}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python make_thumbs.py /path/to/image/folder")
    else:
        create_thumbnails(sys.argv[1])
