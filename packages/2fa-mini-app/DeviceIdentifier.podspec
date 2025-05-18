Pod::Spec.new do |s|
  s.name         = 'DeviceIdentifier'
  s.version      = '0.1.0'
  s.summary      = 'Gets the iOS device IDFV'
  s.homepage     = 'https://your.repo/mini-app'
  s.license      = { :type => 'MIT' }
  s.authors      = { 'You' => 'you@example.com' }
  s.platform     = :ios, '11.0'
  s.source       = { :path => '.' }
  s.source_files = 'ios/DeviceIdentifier.{h,m}'
  s.dependency   'React-Core'
end
