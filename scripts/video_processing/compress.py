import ffmpeg
import os

def compress_video(input_path, output_path, target_size_mb=0.5, duration_limit=7):
    """
    视频压缩函数
    :param input_path: 输入文件路径
    :param output_path: 输出文件路径
    :param target_size_mb: 目标文件大小(MB)
    :param duration_limit: 限制视频时长（秒）
    """
    try:
        # 获取原始视频信息
        probe = ffmpeg.probe(input_path)
        video_stream = next((s for s in probe['streams'] if s['codec_type'] == 'video'), None)
        
        # 计算目标比特率（核心公式）
        # 由于我们限制了时长，这里使用duration_limit而不是原始时长
        target_bitrate = (target_size_mb * 8192) / duration_limit  # 单位kbps

        # 设置压缩参数
        (
            ffmpeg
            .input(input_path)
            .output(output_path, **{
                'c:v': 'libx264',     # 编码器
                'b:v': f'{target_bitrate:.2f}k',  # 目标码率
                'crf': 28,            # 质量系数（可以适当降低，因为时长变短了）
                'preset': 'veryslow', # 编码预设（使用最慢但压缩率最高的设置）
                's': '640x360',       # 分辨率降至360p
                'r': 20,             # 帧率可以适当提高
                'an': None,          # 移除音频
                'movflags': 'faststart',  # 网页快速播放
                't': duration_limit,   # 限制输出视频时长
                'maxrate': f'{target_bitrate*1.5:.2f}k',  # 最大码率
                'bufsize': f'{target_bitrate*3:.2f}k',    # 缓冲大小
                'x264-params': 'ref=1:bframes=0:me=dia:subme=1:weightp=0'  # 额外的x264参数
            })
            .overwrite_output()
            .run()
        )
        print(f"压缩成功！")
        print(f"原始大小: {os.path.getsize(input_path)/1024/1024:.2f}MB")
        print(f"新大小: {os.path.getsize(output_path)/1024/1024:.2f}MB")
        print(f"新视频时长: {duration_limit}秒")
    except Exception as e:
        print(f"压缩失败: {str(e)}")

# 使用示例
compress_video(
    input_path='files/sea-background.mp4',
    output_path='assets/videos/sea-background_compressed.mp4',
    target_size_mb=0.5,  # 目标大小设为0.5MB
    duration_limit=7     # 限制视频长度为7秒
)