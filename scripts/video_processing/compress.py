import ffmpeg
import os

def compress_video(input_path, output_path, target_size_mb=0.5, clip_video=False,duration_limit=None):
    """
    视频压缩函数
    :param input_path: 输入文件路径
    :param output_path: 输出文件路径
    :param target_size_mb: 目标文件大小(MB)
    :param clip_video: 是否截断视频
    :param duration_limit: 限制视频时长（秒）（仅在clip_video=True时有效）
    """
    try:
        # 获取原始视频信息
        probe = ffmpeg.probe(input_path)
        video_stream = next((s for s in probe['streams'] if s['codec_type'] == 'video'), None)
        
        # 获取原始视频时长
        original_duration = float(video_stream['duration'])
        
        # 如果不截断视频，使用原始视频时长
        actual_duration = duration_limit if clip_video else original_duration
        
        # 计算目标比特率（核心公式）
        target_bitrate = (target_size_mb * 8192) / actual_duration  # 单位kbps

        # 设置压缩参数
        output_params = {
            'c:v': 'libx264',     # 编码器
            'b:v': f'{target_bitrate:.2f}k',  # 目标码率
            'crf': 28,            # 质量系数
            'preset': 'veryslow', # 编码预设（使用最慢但压缩率最高的设置）
            's': '640x360',       # 分辨率降至360p
            'r': 20,             # 帧率可以适当提高
            'an': None,          # 移除音频
            'movflags': 'faststart',  # 网页快速播放
            'maxrate': f'{target_bitrate*1.5:.2f}k',  # 最大码率
            'bufsize': f'{target_bitrate*3:.2f}k',    # 缓冲大小
            'x264-params': 'ref=1:bframes=0:me=dia:subme=1:weightp=0'  # 额外的x264参数
        }
        
        # 如果需要截断视频，添加时长限制参数
        if clip_video:
            output_params['t'] = duration_limit
            
        (
            ffmpeg
            .input(input_path)
            .output(output_path, **output_params)
            .overwrite_output()
            .run()
        )
        
        print(f"压缩成功！")
        print(f"原始大小: {os.path.getsize(input_path)/1024/1024:.2f}MB")
        print(f"新大小: {os.path.getsize(output_path)/1024/1024:.2f}MB")
        
        if clip_video:
            print(f"新视频时长: {duration_limit}秒（已截断）")
        else:
            print(f"保持原始视频时长: {original_duration:.2f}秒")
            
    except Exception as e:
        print(f"压缩失败: {str(e)}")
# 使用示例
compress_video(
    # input_path='files/video.mp4',
    input_path='files/sea-background.mp4',
    output_path='assets/videos/sea-background_compressed.mp4',
    target_size_mb=0.5,  # 目标大小设为0.1MB
    clip_video=False,     # 是否截断视频
    duration_limit=11    # 截断视频长度为11秒
)