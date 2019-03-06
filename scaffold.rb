#!/usr/bin/env ruby
require 'date'
SCAFFOLD_DIR = 'scaffold_templates'

name, *args = ARGV
short_date = Time.now.strftime('%Y-%m-%d')
full_date = Time.now.strftime('%Y-%m-%d %H:%M:%S %z')
snake_dash_name = name.split(/[^a-z0-9]/i).map(&:downcase).join('-')

puts `
  npx simple-scaffold "#{name}" \
    --templates #{SCAFFOLD_DIR}/**/* \
    --output _posts \
    -S false \
    -l "date=#{short_date}" \
    -l "fullDate=#{full_date}" \
    -l snakeDashName=#{snake_dash_name} \
`
